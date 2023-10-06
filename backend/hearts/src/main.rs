use lambda_http::RequestPayloadExt;
use lambda_http::{run, service_fn, Body, Error, Request, RequestExt, Response};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use anyhow::Result;
use dotenv::dotenv;
use std::collections::HashMap;
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;

#[derive(Deserialize, Serialize, Clone, Debug)]
struct RequestBody {
    entity: String
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct Heartz {
    entity: String,
    heartz: i64
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct BrideGroomHeartz {
    bride_heartz: i64,
    groom_heartz: i64
}

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    heartz_data: Option<BrideGroomHeartz>
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

async fn main_logic_get(client_dynamodb: dynamodb::Client) -> Result<BrideGroomHeartz, anyhow::Error> {

    let heartz_list: Vec<Heartz> = pql::<Heartz>(client_dynamodb, format!(r#"
        SELECT entity,
            heartz
        FROM ringonit_hearts;
    "#)).await?;

    let mut bride_heartz = 0i64;
    let mut groom_heartz = 0i64;

    for lline in heartz_list {
        if lline.entity == "bride" {
            bride_heartz = lline.heartz;
        };
        if lline.entity == "groom" {
            groom_heartz = lline.heartz;
        };
    };

    Ok(BrideGroomHeartz {
        bride_heartz: bride_heartz,
        groom_heartz: groom_heartz
    })
}

async fn main_logic_post(request_body: RequestBody, user_id: &str, client_dynamodb: dynamodb::Client) -> Result<(), anyhow::Error> {

    println!("REQUEST BODY -- {:?}", request_body);
    
    let entity = request_body.entity;

    if entity != "bride" && entity != "groom" {
        return Err(anyhow::anyhow!("WRONG entity"))
    };

    let entity_field = format!("{entity}_heartz");

    match pql::<Heartz>(client_dynamodb.clone(), format!(r#"
        UPDATE ringonit_users 
        SET {entity_field} = 0 
        WHERE user_id = '{user_id}' 
          AND {entity_field} IS MISSING;
    "#)).await {
        Ok(_v) => println!("FIRST ROW FOR ENTITY"),
        Err(e) => println!("ALREADY EXISTS ROW FOR ENTITY -- {:?}", e)  
    };

    pql::<Heartz>(client_dynamodb.clone(), format!(r#"
        UPDATE ringonit_users 
        SET {entity_field} = {entity_field} + 1
        WHERE user_id = '{user_id}';
    "#)).await?;

    pql::<Heartz>(client_dynamodb, format!(r#"
        UPDATE ringonit_hearts 
        SET heartz = heartz + 1
        WHERE entity = '{entity}';
    "#)).await?;
    
    Ok(())
}

async fn main_logic(request_body: RequestBody, claims: HashMap<String, serde_json::Value>, method: String, req_id: String) -> Result<ResponseBody, anyhow::Error> {
    
    let user_id: &str = if method == "GET" {
        "anonymous"
    } else {
        match claims.get("user_id") {
            Some(v) => match v.as_str() {
                Some(w) => w,
                None => return Err(anyhow::anyhow!("USER IS NOT A STRING"))
            },
            None => return Err(anyhow::anyhow!("NO USER FOUND"))
        }
    };

    println!("USER -- {}", user_id);

    let awsconf = get_aws_config().await;
    let client_dynamodb = get_dynamodb_client(&awsconf).await;

    let heartz_data = if method == "GET" {
        Some(main_logic_get(client_dynamodb).await?)
    } else if method == "POST" {
        main_logic_post(request_body, user_id, client_dynamodb).await?;
        None
    } else {
        return Err(anyhow::anyhow!("METHOD UNEXPECTED"))
    };

    Ok(ResponseBody {
        error: None,
        req_id: req_id,
        heartz_data: heartz_data
    })
}

async fn function_handler(event: Request) ->  Result<Response<Body>, Error> {

    dotenv().ok();

    println!("REQUEST -- {:?}", event);
    println!("LAMBDA CONTEXT -- {:?}", event.lambda_context());
    println!("REQUEST CONTEXT -- {:?}", event.request_context());

    let req_id = event.lambda_context().request_id;

    let method: String = match event.request_context() {
        lambda_http::request::RequestContext::ApiGatewayV2(v) => v.http.method.as_str().to_string()
    };

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

    let empty_request = RequestBody {
        entity: "".to_string()
    };

    let request_body = match event.payload::<RequestBody>() {
        Ok(v) => match v {
            Some(w) => w,
            None => empty_request
        },
        Err(e) => {
            println!("WARNING DECODING BODY -- {:?}", e);
            empty_request
        }
    };

    let response = match main_logic(request_body, claims, method, req_id.clone()).await {
        Ok(v) => prepare_response(200, v),
        Err(e) => prepare_response(
            500,
            ResponseBody {
                req_id: req_id, 
                error: Some(format!("{:?}", e)),
                heartz_data: None
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
