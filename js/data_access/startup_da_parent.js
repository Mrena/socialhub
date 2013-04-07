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

var runQuery = function(queryText,mysql_con,client,success_callback){
	
	 mysql_con.query(queryText,function(error){
   	 if(error)
   		 throw error;
   	 
    });
	 
	 success_callback(client);
	
};

var runSelectQuery = function(query,client,mysql_con,logic_func){
	
	 mysql_con.query(query,function(error,rows,fields){
   	 if(error)
   		 throw error;
   	    
   	 logic_func(client,rows,fields);
   	 
    });
	
	
};



exports.connection = connection;
exports.runQuery = runQuery;
exports.runSelectQuery = runSelectQuery;
