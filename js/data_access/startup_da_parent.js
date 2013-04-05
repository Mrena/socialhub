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

var runQuery = function(queryText,mysql_con){
	
	 mysql_con.query(queryText,function(error){
   	 if(error)
   		 throw error;
   	 
    });
	
};

var runSelectQuery = function(query){
	
	 mysql_con.query(query,function(error,rows,fields){
   	 if(error)
   		 throw error;
   	 
    });
	
	
};

exports.connection = connection;
exports.runQuery = runQuery;
exports = runSelectQuery;
