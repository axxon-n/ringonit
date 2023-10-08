use lambda_http::{
    run, service_fn, Body, Error, Request, RequestExt, Response,
    http::{header, HeaderMap}
};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use anyhow::Result;
use dotenv::dotenv;
use std::collections::HashMap;
use axum_extra::extract::{
    cookie::{Cookie, SameSite}
};
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String
}

async fn pql<T: for<'a> Deserialize<'a> + std::clone::Clone>(client: dynamodb::Client, statement: String) -> Result<Vec<T>, anyhow::Error> {
    println!("{}", statement);

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

async fn main_logic(req_id: String, claims: HashMap<String, serde_json::Value>) -> Result<(ResponseBody, HeaderMap), anyhow::Error> {

    dotenv().ok();

    let user_id: &str = match claims.get("user_id") {
        Some(v) => match v.as_str() {
            Some(w) => w,
            None => return Err(anyhow::anyhow!("USER IS NOT A STRING"))
        },
        None => return Err(anyhow::anyhow!("NO USER FOUND"))
    };

    println!("USER -- {}", user_id);

    let awsconf = get_aws_config().await;
    let client_dynamodb = get_dynamodb_client(&awsconf).await;

    pql::<String>(client_dynamodb, format!(r#"
        DELETE FROM ringonit_users
        WHERE user_id = '{user_id}';
    "#)).await?;

    let mut headers = HeaderMap::new();

    let access_cookie = Cookie::build("access_token", "")
    .path("/")
    .max_age(time::Duration::minutes(-1))
    .same_site(SameSite::Lax)
    .http_only(true)
    .finish();

    let refresh_cookie = Cookie::build("refresh_token", "")
    .path("/")
    .max_age(time::Duration::minutes(-1))
    .same_site(SameSite::Lax)
    .http_only(true)
    .finish();

    let logged_in_cookie = Cookie::build("logged_in", "false")
    .path("/")
    .max_age(time::Duration::minutes(-1))
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

    Ok((ResponseBody {
        req_id: req_id, 
        error: None
    }, headers))
}

async fn function_handler(event: Request) ->  Result<Response<Body>, Error> {

    dotenv().ok();

    println!("REQUEST -- {:?}", event);
    println!("LAMBDA CONTEXT -- {:?}", event.lambda_context());
    println!("REQUEST CONTEXT -- {:?}", event.request_context());

    let req_id = event.lambda_context().request_id;

    let claims: HashMap<String, serde_json::Value> = match event.request_context() {
        lambda_http::request::RequestContext::ApiGatewayV2(v) => {
            if v.authorizer.is_some() {
                let authorizer = v.authorizer.unwrap();
                authorizer.lambda
            } else {
                HashMap::new()
            }
        }
    };

    let response = match main_logic(req_id.clone(), claims).await {
        Ok(v) => prepare_response(200, v.0, Some(v.1)),
        Err(e) => prepare_response(
            500,
            ResponseBody {
                req_id: req_id, 
                error: Some(format!("{:?}", e))
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
