const API_BASE_URL = "https://api.ringon.it";

export const request_verify_code = async (phone_number, langu) => {
	const response = await api(
		"/signup", 
		"POST", 
		{"phone_number": phone_number, "langu": langu}, 
		{"Content-Type": "application/json"}, 
		false
	);
	console.log("endpoint POST /signup respone:", response);
	return response;
}

export const enter_verify_code = async (phone_number, verification_code) => {
	const response = await api(
		"/signin", 
		"POST", 
		{"phone_number": phone_number, "verification_code": verification_code}, 
		{"Content-Type": "application/json"}, 
		false
	);
	console.log("endpoint POST /signin respone:", response);
	if (response.access_token) {
		setCookie("access_token", response.access_token, 59/24);
		setCookie("refresh_token", response.refresh_token, 87599/24);
	};
	return response;
}

export const signout = async () => {
	const response = await api(
		"/signout", 
		"POST", 
		null, 
		{"Content-Type": "application/json"}, 
		true
	);
	console.log("endpoint POST /signout respone:", response);
	deleteCookie("access_token");
	deleteCookie("refresh_token");
	return response;
}

export const remove_sign_in = () => {
	deleteCookie("access_token");
	deleteCookie("refresh_token");
}

export const get_user_info = async () => {
	const response = await api(
		"/userinfo", 
		"GET", 
		null, 
		{"Content-Type": "application/json"}, 
		true
	);
	console.log("endpoint GET /userinfo respone:", response);
	return response;
}

export const post_user_info = async (
	name,
    people_number,
    munic_confirm,
    church_confirm,
    party_confirm,
    ship_confirm,
    needs_park,
    hotel_self_hosted,
    notes
) => {
	const response = await api(
		"/userinfo", 
		"POST", 
		{
			"name": name,
		    "people_number": people_number,
		    "ship_confirm": ship_confirm,
		    "munic_confirm": munic_confirm,
		    "party_confirm": party_confirm,
		    "church_confirm": church_confirm,
		    "needs_park": needs_park,
		    "hotel_self_hosted": hotel_self_hosted,
		    "notes": notes
		}, 
		{"Content-Type": "application/json"}, 
		true
	);
	console.log("endpoint POST /userinfo respone:", response);
	return response;
}

export const get_heartz_info = async () => {
	const response = await api(
		"/hearts", 
		"GET", 
		null, 
		{"Content-Type": "application/json"}, 
		false
	);
	console.log("endpoint GET /hearts respone:", response);
	return response;
}

export const post_heartz_info = async (
	entity
) => {
	const response = await api(
		"/hearts", 
		"POST", 
		{
			"entity": entity
		}, 
		{"Content-Type": "application/json"}, 
		true
	);
	console.log("endpoint POST /hearts respone:", response);
	return response;
}

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const checkCookie = (cname) => {
  let coo = getCookie(cname);
  if (coo) {
  	return true;
  } else {
  	return false;
  };
}

const deleteCookie = (cname) => {
	document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// const get_cookie_by_name = (name) => {
// 	const regex = new RegExp(`(^| )${name}=([^;]+)`)
//     const match = document.cookie.match(regex)
//     if (match) {
//       return match[2]
//     }
// }

const get_access_token = () => {
    return getCookie("access_token");
};

const get_refresh_token = () => {
    return getCookie("refresh_token");
};

export const is_user_logged_in = () => {
    return checkCookie("access_token");
};

export const is_refresh_token_valid = () => {
    return checkCookie("refresh_token");
};

const auth_state_refresh = async () => {
	const refresh_token = get_refresh_token();
	const response = await api("/refresh", "POST", null, {"refresh_token": refresh_token}, false);
	if (!response.access_token) {
		deleteCookie("access_token");
		deleteCookie("refresh_token");
	} else {
		setCookie("access_token", response.access_token, 59/24);
	};
	console.log(response);
}

const api = async(
	endpoint, 
	method, 
	data = null,
	headers = {
      "Content-Type": "application/json",
    },
    isAuth = true
) => {

	if (isAuth) {
		await auth_state_refresh();
		const access_token = get_access_token();
		headers["Authorization"] = `Bearer ${access_token}`;
	};

	let request = {
	    method: method, // *GET, POST, PUT, DELETE, etc.
	    mode: "cors", // no-cors, *cors, same-origin
	    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: "same-origin", // include, *same-origin, omit
	    headers: headers,
	    redirect: "follow", // manual, *follow, error
	    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	};

	if (data) {
		request.body = JSON.stringify(data);
	};

	const response = await fetch(API_BASE_URL + endpoint, request);
	if (response.status > 199 && response.status < 299){
		return response.json();
	} else {
		return null
	}

}