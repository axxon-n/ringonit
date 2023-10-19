use lambda_http::RequestPayloadExt;
use lambda_http::{run, service_fn, Body, Error, Request, RequestExt, Response};
use lambda_http::http::StatusCode;
use serde::{Deserialize, Serialize};
use anyhow::Result;
use dotenv::dotenv;
use std::collections::HashMap;
use aws_sdk_dynamodb as dynamodb;
use serde_dynamo::from_items;

const MAX_PARK_NUM: usize = 12;

#[derive(Deserialize, Serialize, Clone, Debug)]
struct RequestBody {
    name: Option<String>,
    people_number: Option<i8>,
    ship_confirm: Option<bool>,
    munic_confirm: Option<bool>,
    party_confirm: Option<bool>,
    church_confirm: Option<bool>,
    needs_park: Option<bool>,
    hotel_self_hosted: Option<bool>,
    notes: Option<String>
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct User {
    name: Option<String>,
    people_number: Option<i8>,
    ship_confirm: Option<bool>,
    munic_confirm: Option<bool>,
    party_confirm: Option<bool>,
    church_confirm: Option<bool>,
    needs_park: Option<bool>,
    hotel_self_hosted: Option<bool>,
    notes: Option<String>,
    bride_heartz: Option<i64>,
    groom_heartz: Option<i64>
}

#[derive(Deserialize, Serialize, Clone, Debug)]
struct UserCounter {
    user_id: String
}

#[derive(Deserialize, Serialize, Debug)]
struct ResponseBody {
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    req_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    user_data: Option<User>,
    total_parks: Option<usize>
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
    dynamodb::Client::new(config)
}

async fn get_aws_config() -> aws_config::SdkConfig {
    aws_config::load_from_env().await
}

async fn main_logic_get(user_id: &str, client_dynamodb: dynamodb::Client) -> Result<(User, usize), anyhow::Error> {

    let user_list: Vec<User> = pql::<User>(client_dynamodb.clone(), format!(r#"
        SELECT name,
            people_number,
            ship_confirm,
            munic_confirm,
            party_confirm,
            church_confirm,
            needs_park,
            hotel_self_hosted,
            notes,
            bride_heartz,
            groom_heartz
        FROM ringonit_users
        WHERE user_id = '{user_id}'
    "#)).await?;

    if user_list.len() != 1 {
        return Err(anyhow::anyhow!("ERROR WHILE EXTRACTING USER"))
    };

    let user_list_count: Vec<UserCounter> = pql::<UserCounter>(client_dynamodb, format!(r#"
        SELECT user_id
        FROM ringonit_users
        WHERE needs_park = true
    "#)).await?;

    Ok((user_list[0].clone(), user_list_count.len()))
}

async fn main_logic_post(request_body: RequestBody, user_id: &str, client_dynamodb: dynamodb::Client) -> Result<(), anyhow::Error> {

    println!("REQUEST BODY -- {:?}", request_body);

    let user_name = request_body.name.unwrap_or("".to_string()).replace("'", "`");
    let user_people_number = request_body.people_number.unwrap_or(0);
    let user_ship_confirm = request_body.ship_confirm.unwrap_or(false);
    let user_munic_confirm = request_body.munic_confirm.unwrap_or(false);
    let user_party_confirm = request_body.party_confirm.unwrap_or(false);
    let user_church_confirm = request_body.church_confirm.unwrap_or(false);
    let user_needs_park = request_body.needs_park.unwrap_or(false);
    let user_hotel_self_hosted = request_body.hotel_self_hosted.unwrap_or(false);
    let user_notes = request_body.notes.unwrap_or("".to_string()).replace("'", "`");

    let user_list_count: Vec<UserCounter> = pql::<UserCounter>(client_dynamodb.clone(), format!(r#"
        SELECT user_id
        FROM ringonit_users
        WHERE needs_park = true
    "#)).await?;

    if user_needs_park && user_list_count.len() + 1 > MAX_PARK_NUM {
        return Err(anyhow::anyhow!("max park size reached"))
    };

    if user_name.is_empty() {
        return Err(anyhow::anyhow!("name is required"))
    };

    if user_people_number == 0 {
        return Err(anyhow::anyhow!("user_people_number is required"))
    };

    if user_people_number > 4 {
        return Err(anyhow::anyhow!("user_people_number too big"))
    };

    pql::<User>(client_dynamodb, format!(r#"
        UPDATE ringonit_users
        SET name = '{user_name}'
        SET people_number = {user_people_number}
        SET ship_confirm = {user_ship_confirm}
        SET munic_confirm = {user_munic_confirm}
        SET party_confirm = {user_party_confirm}
        SET church_confirm = {user_church_confirm}
        SET needs_park = {user_needs_park}
        SET hotel_self_hosted = {user_hotel_self_hosted}
        SET notes = '{user_notes}'
        WHERE user_id = '{user_id}'
    "#)).await?;
    
    Ok(())
}


async fn main_logic(request_body: RequestBody, claims: HashMap<String, serde_json::Value>, method: String, req_id: String) -> Result<ResponseBody, anyhow::Error> {
    
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

    let (user_data, needs_park_counter) = if method == "GET" {
        let result = main_logic_get(user_id, client_dynamodb).await?;
        (Some(result.0), Some(result.1))
    } else if method == "POST" {
        main_logic_post(request_body, user_id, client_dynamodb).await?;
        (None, None)
    } else {
        return Err(anyhow::anyhow!("UNEXPECTED METHOD"))
    };

    Ok(ResponseBody {
        error: None,
        req_id: req_id,
        user_data: user_data,
        total_parks: needs_park_counter
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
        name: None,
        people_number: None,
        ship_confirm: None,
        munic_confirm: None,
        party_confirm: None,
        church_confirm: None,
        needs_park: None,
        hotel_self_hosted: None,
        notes: None
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
                user_data: None,
                total_parks: None
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
