var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection(config)
connection.connect();

router.post('/register', (req,res,next)=>{
	console.log(req.body);
	// res.json(req.body);
	const userData = req.body;
	// Express just got a post request to /register. This must be
	// from our react app. Specifically, the /register form.
	// This means, someone is trying to register. We have their data
	// inside of userData.
	// We need to insert their data into 2 tables:
	// 1. Users.
	//  - Users table needs their customer ID from the customers table
	//  - password, which needs to be hashed
	//  - email
	//  - arbitraty token which Express will create
	// 2. Customers.
	// - Name, city, state, salesRep, creditLimit
	// FIRST query... check to see if the user is already in users.
	// - if they are, res.json({msg:"userExists"})
	// - if they aren't...
	//   - insert user into customers FIRST (because we need CID for users)
	//   - insert user into users
	//   - res.json({msg:"userInserted", token: token, name: name})
})


module.exports = router;
