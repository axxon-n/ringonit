use lambda_http::RequestPayloadExt;
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
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;
use aws_sdk_secretsmanager as secretsmanager;
use axum_extra::extract::{
    cookie::{Cookie, SameSite}
};
// use std::{thread, time as std_time};
// use async_recursion::async_recursion;
use constant_time_eq::constant_time_eq;

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

// #[derive(Deserialize, Debug, Clone)]
// struct OTPResponse {
//     sid: String,
// }

// #[derive(Deserialize, Debug, Clone)]
// struct OTPVerifyResponse {
//     status: String,
// }

// #[derive(Serialize, Debug, Clone)]
// struct APIResponse {
//     status: u16,
//     message: String,
//     data: String,
// }

#[derive(Deserialize, Serialize, Clone, Debug)]
struct RequestBody {
    phone_number: String,
    verification_code: String
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct User {
    user_id: String,
    user_verified: bool,
    verification_code: String
}

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    access_token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    refresh_token: Option<String>
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

// fn verify_jwt_token(
//     public_key: String,
//     token: &str,
// ) -> Result<TokenDetails, jsonwebtoken::errors::Error> {
//     let bytes_public_key = general_purpose::STANDARD.decode(public_key).unwrap();
//     let decoded_public_key = String::from_utf8(bytes_public_key).unwrap();

//     let validation = jsonwebtoken::Validation::new(jsonwebtoken::Algorithm::RS256);

//     let decoded = jsonwebtoken::decode::<TokenClaims>(
//         token,
//         &jsonwebtoken::DecodingKey::from_rsa_pem(decoded_public_key.as_bytes())?,
//         &validation,
//     )?;

//     let user_id = Uuid::parse_str(decoded.claims.sub.as_str()).unwrap();
//     let token_uuid = Uuid::parse_str(decoded.claims.token_uuid.as_str()).unwrap();

//     Ok(TokenDetails {
//         token: None,
//         token_uuid,
//         user_id,
//         expires_in: None,
//     })
// }

fn generate_token(
    user_id: uuid::Uuid,
    max_age: i64,
    private_key: String,
) -> Result<TokenDetails, anyhow::Error> {
    generate_jwt_token(user_id, max_age, private_key).map_err(|e| {
        anyhow::anyhow!("ERROR GENERATING TOKEN {:?}", e)
    })
}

// #[async_recursion]
// async fn send_request(client: Client, url: String, account_sid: &str, auth_token: &str, form_body: HashMap<&'async_recursion str, &'async_recursion std::string::String>, headers: HeaderMap, stop_iteration: bool) -> Result<OTPVerifyResponse, anyhow::Error>{
    
//     let step_await = std_time::Duration::from_millis(2500);

//     let res = client
//         .post(url.clone())
//         .basic_auth(account_sid, Some(auth_token))
//         .headers(headers.clone())
//         .form(&form_body)
//         .send()
//         .await;

//     let res_data: OTPVerifyResponse = match res {
//         Ok(response) => {
//             let data = response.json::<OTPVerifyResponse>().await;
//             match data {
//                 Ok(result) => {
//                     if result.status == "approved" {
//                         result
//                     } else if result.status == "pending" && !stop_iteration {
//                         thread::sleep(step_await);
//                         send_request(client, url, account_sid, auth_token, form_body, headers, false).await?
//                     } else {
//                        return Err(anyhow::anyhow!(format!("Error verifying OTP - {:?}", result))) 
//                     }
//                 }
//                 Err(e) => return Err(anyhow::anyhow!(format!("Error verifying OTP - {:?}", e))),
//             }
//         }
//         Err(f) => return Err(anyhow::anyhow!(format!("Error verifying OTP - {:?}", f))),
//     };

//     Ok(res_data)
// }

// async fn verify_otp(phone_number: &String, code: &String, my_secrets: &KeepYourSecretsThen) -> Result<OTPVerifyResponse, anyhow::Error> {
    
//     let account_sid = &my_secrets.twilio_account_sid;
//     let auth_token = &my_secrets.twilio_authtoken;
//     let service_id = &my_secrets.twilio_services_id;

//     let url = format!(
//         "https://verify.twilio.com/v2/Services/{serv_id}/VerificationCheck",
//         serv_id = service_id,
//     );

//     let mut headers = header::HeaderMap::new();
//     headers.insert(
//         "Content-Type",
//         "application/x-www-form-urlencoded".parse().unwrap(),
//     );

//     let mut form_body: HashMap<&str, &String> = HashMap::new();
//     form_body.insert("To", phone_number);
//     form_body.insert("Code", code);

//     let client = Client::new();

//     let res_data = send_request(client, url, account_sid, auth_token, form_body, headers, false).await?;

//     Ok(res_data)
// }

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

async fn pql<T: for<'a> Deserialize<'a> + std::clone::Clone>(client: dynamodb::Client, statement: String) -> Result<Vec<T>, anyhow::Error> {
    let statement_output = match client.execute_statement().statement(statement).send().await {
        Ok(v) => v,
        Err(e) => return Err(e.into())
    };
    let items_data: Vec<T> = match statement_output.items() {
        Some(s) => {
            let struc: Vec<T> = match from_items(s.to_vec()) {
                Ok(w) => w,
                Err(f) => return Err(f.into())
            };
            struc
        }
        None => [].to_vec()
    };
    Ok(items_data)
}

async fn get_dynamodb_client(config: &aws_config::SdkConfig) -> dynamodb::Client {
    dynamodb::Client::new(config)
}

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

async fn main_logic(request_body: RequestBody, req_id: String) -> Result<(ResponseBody, HeaderMap), anyhow::Error> {

    let phone_number = request_body.phone_number;
    let verification_code = request_body.verification_code;

    let awsconf = get_aws_config().await;
    let my_secrets = get_my_secrets_now(&awsconf).await?;
    let client_dynamodb = get_dynamodb_client(&awsconf).await;

    // let otp_response = verify_otp(&phone_number, &verification_code, &my_secrets).await?;

    // println!("OTP RESPONSE -- {:?}", otp_response);

    let user_list: Vec<User> = pql::<User>(client_dynamodb.clone(), format!(r#"
        SELECT user_id,
            user_verified,
            verification_code
        FROM ringonit_users
        WHERE phone_number = '{phone_number}'  
    "#)).await?;

    let (user_id_string, user_id, verification_code_saved) = if user_list.len() > 0 {
        let user_line = user_list[0].clone();
        (user_line.clone().user_id, Uuid::parse_str(&user_line.user_id)?, user_line.clone().verification_code)
    } else {
        // Uuid::new_v4()
        return Err(anyhow::anyhow!("NO USER FOUND"))
    };

    if !constant_time_eq(verification_code_saved.as_bytes(), verification_code.as_bytes()) {
        return Err(anyhow::anyhow!("VERIFICATION_CODE DOES NOT MATCH"))
    };

    let access_token_details = generate_token(
        user_id,
        my_secrets.access_token_maxage.clone(),
        my_secrets.access_token_private_key,
    )?;
    let refresh_token_details = generate_token(
        user_id,
        my_secrets.refresh_token_maxage.clone(),
        my_secrets.refresh_token_private_key,
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

    let refresh_cookie = Cookie::build(
        "refresh_token",
        refresh_token_details.token.clone().unwrap_or_default(),
    )
    .path("/")
    .max_age(time::Duration::minutes(my_secrets.refresh_token_maxage * 60))
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
        refresh_cookie.to_string().parse().unwrap(),
    );
    headers.append(
        header::SET_COOKIE,
        logged_in_cookie.to_string().parse().unwrap(),
    );

    pql::<User>(client_dynamodb.clone(), format!(r#"
        UPDATE ringonit_users
        SET user_verified = true
        SET verification_code = ''
        WHERE user_id = '{user_id_string}';
    "#)).await?;

    Ok((ResponseBody {
        req_id: req_id, 
        error: None,
        access_token: Some(access_token_details.token.clone().unwrap_or_default()),
        refresh_token: Some(refresh_token_details.token.clone().unwrap_or_default())
    }, headers))
}

async fn function_handler(event: Request) ->  Result<Response<Body>, Error> {

    dotenv().ok();

    println!("REQUEST -- {:?}", event);

    let req_id = event.lambda_context().request_id;

    let request_body = event.payload::<RequestBody>()?.unwrap();

    if request_body.clone().phone_number.is_empty() {
        return Ok(prepare_response(
            400,
            ResponseBody {
                req_id: req_id, 
                error: Some("'phone_number' must not be empty".to_string()),
                access_token: None,
                refresh_token: None
            },
            None
        ).await?);
    };

    let response = match main_logic(request_body, req_id.clone()).await {
        Ok(v) => prepare_response(200, v.0, Some(v.1)),
        Err(e) => prepare_response(
            500,
            ResponseBody {
                req_id: req_id, 
                error: Some(format!("{:?}", e)),
                access_token: None,
                refresh_token: None
            },
            None
        )
    };

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

#[cfg(test)]
mod tests {

    use super::*;

    #[tokio::test]
    async fn test_generate_jwt() {

        let awsconf = get_aws_config().await;
        let my_secrets = match get_my_secrets_now(&awsconf).await {
            Ok(v) => v,
            Err(e) => panic!("{:?}", e)
        };

        println!("SECRETS -- {:?}", my_secrets);

        let user_id = Uuid::new_v4();
        let ttl = my_secrets.access_token_maxage.clone();
        let private_key = my_secrets.access_token_private_key;

        let bytes_private_key = general_purpose::STANDARD.decode(private_key).unwrap();
        println!("bytes_private_key -- {:?}", bytes_private_key);
        let decoded_private_key = String::from_utf8(bytes_private_key).unwrap();
        println!("decoded_private_key -- {:?}", decoded_private_key);

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

        let wwww = match jsonwebtoken::EncodingKey::from_rsa_pem(decoded_private_key.as_bytes()){
            Ok(w) => w,
            Err(f) => panic!("from_rsa_pem ERROR -- {:?}", f)
        };

        let header = jsonwebtoken::Header::new(jsonwebtoken::Algorithm::RS256);
        let token = match jsonwebtoken::encode(
            &header,
            &claims,
            &wwww,
        ) {
            Ok(v) => v,
            Err(e) => panic!("ENCODE ERROR -- {:?}", e)
        };

        println!("TEST DONE -- {:?}", token);
    }

}
