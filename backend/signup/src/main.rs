use lambda_http::RequestPayloadExt;
use lambda_http::{run, service_fn, Body, Error, Request, RequestExt, Response};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use anyhow::Result;
use dotenv::dotenv;
use std::collections::HashMap;
// use reqwest::{header, Client};
// use serde_json::json;
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;
// use aws_sdk_secretsmanager as secretsmanager;
use aws_sdk_sns as sns;
use aws_sdk_sns::types::MessageAttributeValue;
use rand::Rng;
use uuid::Uuid;

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

// #[derive(Deserialize, Clone, Debug)]
// #[allow(dead_code)]
// struct KeepYourSecretsThen {
//     twilio_account_sid: String,
//     twilio_authtoken: String,
//     twilio_services_id: String,
//     access_token_private_key: String,
//     access_token_public_key: String,
//     refresh_token_private_key: String,
//     refresh_token_public_key: String,
//     access_token_expired_in: String,
//     access_token_maxage: i64,
//     refresh_token_expired_in: String,
//     refresh_token_maxage: i64
// }

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


// async fn send_otp(phone_number: &String, my_secrets: &KeepYourSecretsThen) -> Result<OTPResponse, anyhow::Error> {
    
//     let account_sid = &my_secrets.twilio_account_sid;
//     let auth_token = &my_secrets.twilio_authtoken;
//     let service_id = &my_secrets.twilio_services_id;

//     let url = format!(
//         "https://verify.twilio.com/v2/Services/{serv_id}/Verifications",
//         serv_id = service_id
//     );

//     let mut headers = header::HeaderMap::new();
//     headers.insert(
//         "Content-Type",
//         "application/x-www-form-urlencoded".parse().unwrap(),
//     );

//     let mut form_body: HashMap<&str, String> = HashMap::new();
//     form_body.insert("To", phone_number.to_string());
//     form_body.insert("Channel", "sms".to_string());

//     let client = Client::new();
//     let res = client
//         .post(url)
//         .basic_auth(account_sid, Some(auth_token))
//         .headers(headers)
//         .form(&form_body)
//         .send()
//         .await;

//     let res_data: OTPResponse = match res {
//         Ok(response) => {
//             let result = response.json::<OTPResponse>().await;
//             match result {
//                 Ok(data) => data,
//                 Err(e) => return Err(anyhow::anyhow!(format!("Error sending OTP - {:?}", e))),
//             }
//         }
//         Err(f) => return Err(anyhow::anyhow!(format!("Error sending OTP - {:?}", f))),
//     };

//     Ok(res_data)
// }

    // async fn verify_otp(phone_number: &String, code: &String) -> Result<OTPVerifyResponse, String> {
    //     let account_sid = TwilioService::env_loader("TWILIO_ACCOUNT_SID");
    //     let auth_token = TwilioService::env_loader("TWILIO_AUTHTOKEN");
    //     let service_id = TwilioService::env_loader("TWILIO_SERVICES_ID");

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
    //     let res = client
    //         .post(url)
    //         .basic_auth(account_sid, Some(auth_token))
    //         .headers(headers)
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
    //                     } else {
    //                         return Err(format!("Error verifying OTP - {:?}", result))
    //                     }
    //                 }
    //                 Err(e) => return Err(format!("Error verifying OTP - {:?}", e)),
    //             }
    //         }
    //         Err(f) => return Err(format!("Error verifying OTP - {:?}", f)),
    //     };

    //     Ok(res_data)
    // }

#[derive(Deserialize, Serialize, Clone, Debug)]
struct RequestBody {
    phone_number: String,
    langu: String
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct User {
    user_id: String
}

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String,
}

async fn prepare_response(status_code: u16, resp: ResponseBody) -> Result<Response<Body>, anyhow::Error> {

    if status_code < 200 || status_code > 299 {
        println!("ERROR -- {:?}", resp);
    };

    let response = Response::builder()
        .status(StatusCode::from_u16(status_code).unwrap())
        .header("content-type", "application/json")
        .body(serde_json::json!(resp).to_string().into())
        .map_err(Box::new)?;
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
    dynamodb::Client::new(&config)
}

async fn get_aws_config() -> aws_config::SdkConfig {
    aws_config::load_from_env().await
}

// async fn get_secrets_manager_client(config: &aws_config::SdkConfig) -> secretsmanager::Client {
//     secretsmanager::Client::new(config)
// }

async fn get_sns_client(config: &aws_config::SdkConfig) -> sns::Client {
    sns::Client::new(config)
}

async fn send_sms(sns_client: sns::Client, phone_number: &str, langu: &str, verification_code: &str) -> Result<(), anyhow::Error> {
    let message = if langu == "it" {
        format!("ringon.it: Codice di verifica. Il tuo codice di sicurezza è {verification_code}. Non condividerlo con nessun altro. Buona giornata!")
    } else if langu == "ro" {
        format!("ringon.it: Cod de verificare. Codul tău de securitate este {verification_code}. Nu-l împărtăși cu nimeni altcineva. O zi frumoasă!")
    } else if langu == "de" {
        format!("ringon.it: Verifizierungscode. Ihr Sicherheitscode lautet {verification_code}. Teilen Sie ihn nicht mit anderen. Haben Sie einen schönen Tag!")
    } else {
        format!("ringon.it: Verification Code. Your security code is {verification_code}. Do not share it with anyone else. Have a great day!")
    };
    let mut message_attributes = HashMap::new();
    let message_attributes_valuse = MessageAttributeValue::builder().set_data_type(Some("String".to_string())).set_string_value(Some("RINGONIT".to_string())).build();
    message_attributes.insert("AWS.SNS.SMS.SenderID".to_string(), message_attributes_valuse);
    let resp = sns_client.publish().phone_number(phone_number).message(message).set_message_attributes(Some(message_attributes)).send().await?;
    println!("SNS RESPONSE -- {:?}", resp);
    Ok(())
}

fn generate_verification_code() -> String {
    let mut rng = rand::thread_rng();
    let mut verification_code: String = "".to_string();
    for _n in 0..6 {
        let random_number = rng.gen_range(0..9);
        verification_code = format!("{verification_code}{random_number}");
    };
    verification_code
}

async fn insert_verification_code(dynamodb_client: dynamodb::Client, user_id: &str, phone_number: &str, verification_code: &str, is_new_user: bool) -> Result<(), anyhow::Error> {
    if is_new_user {
        pql::<User>(dynamodb_client, format!(r#"
            INSERT INTO ringonit_users
            VALUE {{
                'user_id': '{user_id}',
                'phone_number': '{phone_number}',
                'verification_code': '{verification_code}',
                'user_verified': false
            }};
        "#)).await?;
    } else {
        pql::<User>(dynamodb_client, format!(r#"
            UPDATE ringonit_users
            SET verification_code = '{verification_code}'
            SET user_verified = false
            WHERE user_id = '{user_id}';
        "#)).await?;
    };
    Ok(())
}   

// async fn get_secret_value(client: &secretsmanager::Client, name: &str) -> Result<KeepYourSecretsThen, anyhow::Error> {
//     let resp = client.get_secret_value().secret_id(name).send().await?;

//     let sec: KeepYourSecretsThen = serde_json::from_str(resp.secret_string().unwrap_or("{}"))?;

//     Ok(sec)
// }

// async fn get_my_secrets_now() -> Result<KeepYourSecretsThen, anyhow::Error> {
//     let secret_name = dotenv::var("SECRET_NAME").unwrap();
//     let my_secrets = get_secret_value(
//         &get_secrets_manager_client(
//             &get_aws_config().await
//         ).await,
//         &secret_name
//     ).await?;
//     Ok(my_secrets)
// }

async fn main_logic(request_body: RequestBody, req_id: String) -> Result<ResponseBody, anyhow::Error> {

    let phone_number = request_body.phone_number;
    let langu = request_body.langu;
    let verification_code = generate_verification_code();

    let awsconf = get_aws_config().await;
    let dynamodb_client = get_dynamodb_client(&awsconf).await;
    let sns_client = get_sns_client(&awsconf).await;

    // let my_secrets = get_my_secrets_now().await?;

    let users: Vec<User> = pql::<User>(dynamodb_client.clone(), format!(r#"
        SELECT user_id
        FROM ringonit_users
        WHERE phone_number = '{phone_number}';
    "#)).await?;

    let user_id = if users.len() > 0 {
        users[0].clone().user_id
    } else {
        Uuid::new_v4().to_string()
    };

    // let otp_response = send_otp(&phone_number, &my_secrets).await?;

    send_sms(sns_client, &phone_number, &langu, &verification_code).await?;
    insert_verification_code(dynamodb_client, &user_id, &phone_number, &verification_code, users.len() == 0).await?;

    // println!("OTP RESPONSE -- {:?}", otp_response);

    Ok(ResponseBody {
        req_id: req_id, 
        error: None
    })
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
            }
        ).await?);
    };

    let response = match main_logic(request_body, req_id.clone()).await {
        Ok(v) => prepare_response(200,v),
        Err(e) => prepare_response(
            500,
            ResponseBody {
                req_id: req_id, 
                error: Some(format!("{:?}", e)),
            }
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
