// An action is a JavaScript function that returns
// an object. That object MUST have at least a property of "type"

export default function(){
	console.log("Auth Action is running...")
	return{
		type: "AUTH_ACTION",
		payload: "User Registered"
	}
}