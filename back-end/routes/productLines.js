var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var stripe = require('stripe')(config.stripeKey);
var connection = mysql.createConnection(config)
connection.connect();


router.get('/get', (req, res, next)=>{
	const selectQuery = `SELECT * FROM productlines`;
	connection.query(selectQuery,(error, results)=>{
		if(error){
			throw error; //dev only
		}else{
			res.json(results)
		}
	})
});

router.get('/:productline/get',(req, res, next)=>{
	const pl = req.params.productline
	var plQuery = `SELECT * FROM productlines
		INNER JOIN products ON productlines.productLine = products.productLine
		WHERE productlines.productline = ?` 
	connection.query(plQuery,[pl],(error,results)=>{
		if (error){
			throw error //dev only
		}else{
			res.json(results);
		}
	})
});

module.exports = router;