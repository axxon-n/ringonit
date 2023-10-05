// use lambda_http::RequestPayloadExt;
use lambda_http::{
    run, service_fn, Body, Error, Request, RequestExt, Response,
    http::{header, HeaderMap}
};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use base64::{engine::general_purpose, Engine as _};
use uuid::Uuid;
use anyhow::Result;
use dotenv::dotenv;
// use std::collections::HashMap;
// use reqwest::{Client};
// use serde_json::json;
// use aws_sdk_dynamodb as dynamodb;
// use serde_dynamo::from_items;
use aws_sdk_secretsmanager as secretsmanager;
use axum_extra::extract::{
    cookie::{Cookie, SameSite}
};

// #[derive(Deserialize, Debug, Clone)]
// #[serde(rename_all = "camelCase")]
// struct OTPData {
//     phone_number: String,
// }

// #[derive(Deserialize, Debug, Clone)]
// #[serde(rename_all = "camelCase")]
// struct VerifyOTPData {
//     user: OTPData,
//     code: String,
// }

#[derive(Deserialize, Clone, Debug)]
#[allow(dead_code)]
struct KeepYourSecretsThen {
    twilio_account_sid: String,
    twilio_authtoken: String,
    twilio_services_id: String,
    access_token_private_key: String,
    access_token_public_key: String,
    refresh_token_private_key: String,
    refresh_token_public_key: String,
    access_token_expired_in: String,
    access_token_maxage: i64,
    refresh_token_expired_in: String,
    refresh_token_maxage: i64
}

#[derive(Debug, Serialize, Deserialize)]
struct TokenDetails {
    token: Option<String>,
    token_uuid: uuid::Uuid,
    user_id: uuid::Uuid,
    expires_in: Option<i64>,
}

#[derive(Debug, Serialize, Deserialize)]
struct TokenClaims {
    sub: String,
    token_uuid: String,
    exp: i64,
    iat: i64,
    nbf: i64,
}

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    access_token: Option<String>
}

fn generate_jwt_token(
    user_id: uuid::Uuid,
    ttl: i64,
    private_key: String,
) -> Result<TokenDetails, jsonwebtoken::errors::Error> {
    let bytes_private_key = general_purpose::STANDARD.decode(private_key).unwrap();
    let decoded_private_key = String::from_utf8(bytes_private_key).unwrap();

    let now = chrono::Utc::now();
    let mut token_details = TokenDetails {
        user_id,
        token_uuid: Uuid::new_v4(),
        expires_in: Some((now + chrono::Duration::minutes(ttl)).timestamp()),
        token: None,
    };

    let claims = TokenClaims {
        sub: token_details.user_id.to_string(),
        token_uuid: token_details.token_uuid.to_string(),
        exp: token_details.expires_in.unwrap(),
        iat: now.timestamp(),
        nbf: now.timestamp(),
    };

    let header = jsonwebtoken::Header::new(jsonwebtoken::Algorithm::RS256);
    let token = jsonwebtoken::encode(
        &header,
        &claims,
        &jsonwebtoken::EncodingKey::from_rsa_pem(decoded_private_key.as_bytes())?,
    )?;
    token_details.token = Some(token);
    Ok(token_details)
}

fn verify_jwt_token(
    public_key: String,
    token: &str,
) -> Result<TokenDetails, jsonwebtoken::errors::Error> {
    let bytes_public_key = general_purpose::STANDARD.decode(public_key).unwrap();
    let decoded_public_key = String::from_utf8(bytes_public_key).unwrap();

    let validation = jsonwebtoken::Validation::new(jsonwebtoken::Algorithm::RS256);

    let decoded = jsonwebtoken::decode::<TokenClaims>(
        token,
        &jsonwebtoken::DecodingKey::from_rsa_pem(decoded_public_key.as_bytes())?,
        &validation,
    )?;

    let user_id = Uuid::parse_str(decoded.claims.sub.as_str()).unwrap();
    let token_uuid = Uuid::parse_str(decoded.claims.token_uuid.as_str()).unwrap();

    Ok(TokenDetails {
        token: None,
        token_uuid,
        user_id,
        expires_in: None,
    })
}

fn generate_token(
    user_id: uuid::Uuid,
    max_age: i64,
    private_key: String,
) -> Result<TokenDetails, anyhow::Error> {
    generate_jwt_token(user_id, max_age, private_key).map_err(|e| {
        anyhow::anyhow!("ERROR GENERATING TOKEN {:?}", e)
    })
}

async fn prepare_response(status_code: u16, resp: ResponseBody, headers: Option<HeaderMap>) -> Result<Response<Body>, anyhow::Error> {

    if status_code < 200 || status_code > 299 {
        println!("ERROR -- {:?}", resp);
    };

    let mut response = Response::builder()
        .status(StatusCode::from_u16(status_code).unwrap())
        .header("content-type", "application/json")
        .body(serde_json::json!(resp).to_string().into())
        .map_err(Box::new)?;
    
    if headers.is_some() {
        for (key, value) in headers.unwrap().iter() {
            response.headers_mut().insert(key, value.clone());
        };
    };

    Ok(response)
}

// async fn pql<T: for<'a> Deserialize<'a> + std::clone::Clone>(client: dynamodb::Client, statement: String) -> Result<Vec<T>, anyhow::Error> {
//     let statement_output = match client.execute_statement().statement(statement).send().await {
//         Ok(v) => v,
//         Err(e) => return Err(e.into())
//     };
//     let items_data: Vec<T> = match statement_output.items() {
//         Some(s) => {
//             let struc: Vec<T> = match from_items(s.to_vec()) {
//                 Ok(w) => w,
//                 Err(f) => return Err(f.into())
//             };
//             struc
//         }
//         None => [].to_vec()
//     };
//     Ok(items_data)
// }

// async fn get_dynamodb_client(config: &aws_config::SdkConfig) -> dynamodb::Client {
//     dynamodb::Client::new(config)
// }

async fn get_aws_config() -> aws_config::SdkConfig {
    aws_config::load_from_env().await
}

async fn get_secrets_manager_client(config: &aws_config::SdkConfig) -> secretsmanager::Client {
    secretsmanager::Client::new(config)
}

async fn get_secret_value(client: &secretsmanager::Client, name: &str) -> Result<KeepYourSecretsThen, anyhow::Error> {
    let resp = client.get_secret_value().secret_id(name).send().await?;

    let sec: KeepYourSecretsThen = serde_json::from_str(resp.secret_string().unwrap_or("{}"))?;

    Ok(sec)
}

async fn get_my_secrets_now(config: &aws_config::SdkConfig) -> Result<KeepYourSecretsThen, anyhow::Error> {
    let secret_name = dotenv::var("SECRET_NAME").unwrap();
    let my_secrets = get_secret_value(
        &get_secrets_manager_client(
            config
        ).await,
        &secret_name
    ).await?;
    Ok(my_secrets)
}

async fn main_logic(request_headers: HeaderMap, req_id: String) -> Result<(ResponseBody, HeaderMap), anyhow::Error> {

    let awsconf = get_aws_config().await;
    let my_secrets = get_my_secrets_now(&awsconf).await?;
    let refresh_token = match request_headers.get("refresh_token") {
        Some(v) => v,
        None => return Err(anyhow::anyhow!("NO HEADER KEY refresh_token"))
    };

    let refresh_token_details = verify_jwt_token(my_secrets.refresh_token_public_key, refresh_token.to_str()?)?;

    let access_token_details = generate_token(
        refresh_token_details.user_id,
        my_secrets.access_token_maxage.clone(),
        my_secrets.access_token_private_key,
    )?;

    let mut headers = HeaderMap::new();

    let access_cookie = Cookie::build(
        "access_token",
        access_token_details.token.clone().unwrap_or_default(),
    )
    .path("/")
    .max_age(time::Duration::minutes(my_secrets.access_token_maxage.clone() * 60))
    .same_site(SameSite::Lax)
    .http_only(true)
    .finish();

    let logged_in_cookie = Cookie::build(
        "logged_in", 
        "true"
    )
    .path("/")
    .max_age(time::Duration::minutes(my_secrets.access_token_maxage * 60))
    .same_site(SameSite::Lax)
    .http_only(false)
    .finish();

    headers.append(
        header::SET_COOKIE,
        access_cookie.to_string().parse().unwrap(),
    );
    headers.append(
        header::SET_COOKIE,
        logged_in_cookie.to_string().parse().unwrap(),
    );

    Ok((ResponseBody {
        req_id: req_id, 
        access_token: access_token_details.token.clone(),
        error: None
    }, headers))
}

async fn function_handler(event: Request) ->  Result<Response<Body>, Error> {

    dotenv().ok();

    println!("REQUEST -- {:?}", event);

    let req_id = event.lambda_context().request_id;

    let request_headers: HeaderMap = event.headers().clone();

    let response = match main_logic(request_headers, req_id.clone()).await {
        Ok(v) => prepare_response(200, v.0, Some(v.1)),
        Err(e) => prepare_response(
            500,
            ResponseBody {
                req_id: req_id, 
                error: Some(format!("{:?}", e)),
                access_token: None
            },
            None
        )
    };

    // let response = if request_body.route_type == "code" {
    //     match TwilioService::send_otp(&request_body.phone_number).await {
    //         Ok(v) => {
    //             prepare_response(
    //                 200,
    //                 ResponseBody {
    //                     req_id: req_id, 
    //                     error: None,
    //                     otp_sid: Some(v.sid)
    //                 }
    //             )
    //         },
    //         Err(e) => {
    //             prepare_response(
    //                 500,
    //                 ResponseBody {
    //                     req_id: req_id, 
    //                     error: Some(e.to_string()),
    //                     otp_sid: None
    //                 }
    //             )
    //         }
    //     }
    // } else if request_body.route_type == "verify" {
    //     let code = request_body.code.unwrap_or(String::from(""));
    //     if code.is_empty() {
    //         prepare_response(
    //             400,
    //             ResponseBody {
    //                 req_id: req_id, 
    //                 error: Some("'code' must not be empty".to_string()),
    //                 otp_sid: None
    //             }
    //         )
    //     } else {
    //         match TwilioService::verify_otp(&request_body.phone_number, &code).await {
    //             Ok(v) => {
    //                 prepare_response(
    //                     200,
    //                     ResponseBody {
    //                         req_id: req_id, 
    //                         error: None,
    //                         otp_sid: None
    //                     }
    //                 )
    //             },
    //             Err(e) => {
    //                 prepare_response(
    //                     500,
    //                     ResponseBody {
    //                         req_id: req_id, 
    //                         error: Some(e.to_string()),
    //                         otp_sid: None
    //                     }
    //                 )
    //             }
    //         }
    //     }
    // } else {
    //     prepare_response(
    //         400,
    //         ResponseBody {
    //             req_id: req_id, 
    //             error: Some("'route_type' must be one of 'code' or 'verify'".to_string()),
    //             otp_sid: None
    //         }
    //     )
    // };

    Ok(response.await?)
}


#[tokio::main]
async fn main() -> Result<(), Error> {

    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}
