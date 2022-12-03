// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

//database connection

const mysql = require('mysql');

var config = require('./config.json');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

// check if connection is successful
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// Take in as input a payload storeID, SKU, quantity
//
// {"body" : "{}"}
//
// ===>  { "action" : "get_items",
//          "statusCode": 200}
//
// return response via callback(null, {response})
exports.lambdaHandler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

   // ready to go for CORS. To make this a completed HTTP response, you only need to add a statusCode and a body.
   
   
   response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
            "Access-Control-Allow-Methods": "POST" // Allow POST request
        }
    }; // response
 

 
    
 
    let pullItems = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM item", (error, rows) => {
                if (error) {return reject(error)}
                if (rows) {
                    console.log("item is pulled successfully");
                    return resolve(rows);
                } else {
                    return reject(error);
                }
            }
            )
        });
    };
    
    

 
    try {
 
    	const getItems = await pullItems()
 
    	if (getItems){
    		response.statusCode = 200;
    		response.result = "Got items successfully"
    	}
 
 
    } catch (error){
        response.error = error;
        console.log(error);
        response.result = "Error is here"
        response.statusCode = 400;
    }
    return response;
};