use lambda_http::{
    run, service_fn, Body, Error, Request, RequestExt, Response,
    http::{header, HeaderMap}
};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use anyhow::Result;
use dotenv::dotenv;
use axum_extra::extract::{
    cookie::{Cookie, SameSite}
};

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String
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

async fn main_logic(req_id: String) -> Result<(ResponseBody, HeaderMap), anyhow::Error> {

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

    let req_id = event.lambda_context().request_id;

    let response = match main_logic(req_id.clone()).await {
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
