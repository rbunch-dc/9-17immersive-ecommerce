// An action is a JavaScript function that returns
// an object. That object MUST have at least a property of "type"

import axios from 'axios';

export default function(name){
	console.log("Auth Action is running...")
	console.log(name);
	var axiosPromise = axios({
		url: `${window.apiHost}/register`,
		method: "POST",
		data: name
	});
	console.log(axiosPromise);
	// our redux-promise middleware will kick in
	// because the payload value is a promise
	// redux-promise will hold up the dispatch
	// until it resolves
	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}
}
