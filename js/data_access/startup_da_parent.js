var mysql = require('mysql');
var fs = require("fs");

var connection = function(){
	
	var mysql_con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		database : "printp"
			
	});
	
	return mysql_con;
};

var runQuery = function(queryText,mysql_con,client,error_callback,success_callback){
	
	 mysql_con.query(queryText,function(error){
		 if(error){
			 error_callback(client,error);
		 }else{
			 
			 success_callback(client);
		 }
   	 
   	
    });
	 
	
	
};

var runSelectQuery = function(query,client,mysql_con,error_callback,success_callback){
	
	 mysql_con.query(query,function(error,rows,fields){
		 if(error){
			 error_callback(client,error);
			
		 }else{
   	 
			 success_callback(client,rows,fields);
   	 
		 }
    });
	
	
};

exports.connection = connection;
exports.runQuery = runQuery;
exports.runSelectQuery = runSelectQuery;
