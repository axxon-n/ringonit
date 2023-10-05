use lambda_runtime::{service_fn, Error,  LambdaEvent};
// use serde_json::json;
use serde::{Deserialize, Serialize};
use base64::{engine::general_purpose, Engine as _};
use uuid::Uuid;
use aws_sdk_secretsmanager as secretsmanager;
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;
use dotenv::dotenv;

// static POLICY_VERSION: &str = "2012-10-17"; 

#[derive(Deserialize, Debug)]
struct RequestHeaders {
    authorization: String
}

#[derive(Deserialize, Debug)]
struct Request {
    headers: RequestHeaders
}

// #[derive(Deserialize, Serialize, Debug)]
// struct Response {
//     is_authorized: bool,
//     context: serde_json::Value
// }

#[derive(Deserialize, Serialize, Clone, Debug)]
struct User {
    user_id: String,
    phone_number: String
}

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

async fn main_logic(
    event: LambdaEvent<Request>
) -> Result<serde_json::Value, Error> { 
// ) -> Result<APIGatewayCustomAuthorizerResponse, Error> {

    dotenv().ok();

    println!("EVENT -- {:?}", event);
    println!("EVENT PAYLOAD -- {:?}", event.payload);

    let access_token = event.payload.headers.authorization.replace("Bearer ", "");
    // let method_arn = event.payload.method_arn;
    // let aws_account_id = dotenv::var("ACCOUNT_ID").unwrap();
    // let rest_api_id = dotenv::var("API_ID").unwrap();
    // let region = dotenv::var("REGION").unwrap();
    // let stage = dotenv::var("STAGE").unwrap();

    println!("Client token: {}", access_token);
    // println!("Method ARN: {}", method_arn);

    let awsconf = get_aws_config().await;
    let my_secrets = get_my_secrets_now(&awsconf).await?;
    let dynamodb_client = get_dynamodb_client(&awsconf).await;

    let access_token_details = verify_jwt_token(my_secrets.access_token_public_key, &access_token)?;

    let principal_id = access_token_details.user_id.to_string();

    let user_list: Vec<User> = pql::<User>(dynamodb_client.clone(), format!(r#"
        SELECT user_id, phone_number
        FROM ringonit_users
        WHERE user_id = '{principal_id}'  
    "#)).await?;

    if user_list.len() != 1 {
        return Err(Box::new(simple_error::SimpleError::new("User Not Found")))
    };

    // let tmp: Vec<&str> = method_arn.split(":").collect();
    // let api_gateway_arn_tmp: Vec<&str> = tmp[5].split("/").collect();
    // let aws_account_id = tmp[4];
    // let region = tmp[3];
    // let rest_api_id = api_gateway_arn_tmp[0];
    // let stage = api_gateway_arn_tmp[1];

    // let policy = APIGatewayPolicyBuilder::new(&region, &aws_account_id, &rest_api_id, &stage)
    //     .deny_all_methods()
    //     .build();

    // Ok(APIGatewayCustomAuthorizerResponse {
    //     principal_id: principal_id.to_string(),
    //     policy_document: policy,
    //     context: json!({
    //     "user_id": principal_id.to_string(),
    //     "phone_number": user_list[0].clone().phone_number
    //     }),
    // })

    Ok(serde_json::json!({
        "isAuthorized": true,
        "context": {
            "user_id": principal_id.to_string(),
            "phone_number": user_list[0].clone().phone_number
        },
    }))
}

async fn my_handler(
    event: LambdaEvent<Request>
) -> Result<serde_json::Value, Error> { 
// ) -> Result<APIGatewayCustomAuthorizerResponse, Error> {

    match main_logic(event).await {
        Ok(v) => Ok(v),
        Err(e) => {
            println!("^^^ EXCEPTION: {:?}", e);
            Err(e)
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    let func = service_fn(my_handler);
    lambda_runtime::run(func).await?;

    Ok(())
}

// #[derive(Serialize, Deserialize)]
// #[serde(rename_all = "camelCase")]
// struct APIGatewayCustomAuthorizerRequest {
//     #[serde(rename = "type")]
//     _type: String,
//     authorization_token: String,
//     method_arn: String,
// }

// #[derive(Serialize, Deserialize)]
// #[allow(non_snake_case)]
// struct APIGatewayCustomAuthorizerPolicy {
//     Version: String,
//     Statement: Vec<IAMPolicyStatement>,
// }

// #[derive(Serialize, Deserialize)]
// #[serde(rename_all = "camelCase")]
// struct APIGatewayCustomAuthorizerResponse {
//     principal_id: String,
//     policy_document: APIGatewayCustomAuthorizerPolicy,
//     context: serde_json::Value,
// }

// #[derive(Serialize, Deserialize)]
// #[allow(non_snake_case)]
// struct IAMPolicyStatement {
//     Action: Vec<String>,
//     Effect: Effect,
//     Resource: Vec<String>,
// }

// struct APIGatewayPolicyBuilder {
//     region: String,
//     aws_account_id: String,
//     rest_api_id: String,
//     stage: String,
//     policy: APIGatewayCustomAuthorizerPolicy,
// }

// #[derive(Serialize, Deserialize)]
// enum Method {
//     #[serde(rename = "GET")]
//     Get,
//     #[serde(rename = "POST")]
//     Post,
//     #[serde(rename = "*PUT")]
//     Put,
//     #[serde(rename = "DELETE")]
//     Delete,
//     #[serde(rename = "PATCH")]
//     Patch,
//     #[serde(rename = "HEAD")]
//     Head,
//     #[serde(rename = "OPTIONS")]
//     Options,
//     #[serde(rename = "*")]
//     All,
// }

// #[derive(Serialize, Deserialize)]
// enum Effect {
//     Allow,
//     Deny,
// }

// impl APIGatewayPolicyBuilder {
//     pub fn new(
//         region: &str,
//         account_id: &str,
//         api_id: &str,
//         stage: &str,
//     ) -> APIGatewayPolicyBuilder {
//         Self {
//             region: region.to_string(),
//             aws_account_id: account_id.to_string(),
//             rest_api_id: api_id.to_string(),
//             stage: stage.to_string(),
//             policy: APIGatewayCustomAuthorizerPolicy {
//                 Version: POLICY_VERSION.to_string(),
//                 Statement: vec![],
//             },
//         }
//     }

//     pub fn add_method<T: Into<String>>(
//         mut self,
//         effect: Effect,
//         method: Method,
//         resource: T,
//     ) -> Self {
//         let resource_arn = format!(
//             "arn:aws:execute-api:{}:{}:{}/{}/{}/{}",
//             &self.region,
//             &self.aws_account_id,
//             &self.rest_api_id,
//             &self.stage,
//             serde_json::to_string(&method).unwrap(),
//             resource.into().trim_start_matches("/")
//         );

//         let stmt = IAMPolicyStatement {
//             Effect: effect,
//             Action: vec!["execute-api:Invoke".to_string()],
//             Resource: vec![resource_arn],
//         };

//         self.policy.Statement.push(stmt);
//         self
//     }

//     // pub fn allow_all_methods(self) -> Self {
//     //     self.add_method(Effect::Allow, Method::All, "*")
//     // }

//     pub fn deny_all_methods(self) -> Self {
//         self.add_method(Effect::Deny, Method::All, "*")
//     }

//     // pub fn allow_method(self, method: Method, resource: String) -> Self {
//     //     self.add_method(Effect::Allow, method, resource)
//     // }

//     // pub fn deny_method(self, method: Method, resource: String) -> Self {
//     //     self.add_method(Effect::Deny, method, resource)
//     // }

//     // Creates and executes a new child thread.
//     pub fn build(self) -> APIGatewayCustomAuthorizerPolicy {
//         self.policy
//     }
// }