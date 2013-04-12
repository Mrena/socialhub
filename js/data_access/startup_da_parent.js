var mysql = require('mysql');
var fs = require("fs");

var connection = function(){
	
	try{
	var mysql_con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		database : "printp"
			
	});
	
	return mysql_con;
	
	}catch(err){
		logDatabaseSystemError(err);
	}
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

var logDatabaseSystemError = function(error,file_name,line_number){
	
	var system_error = {
			"error" : error,
			"file_name" : file_name,
			"line_number" : line_number
		};
	
	fs.appendFile(__dirname+"/log_files/database_system_errors.txt",JSON.stringify(system_error).concat('\n'),'utf8',function(err){
		if(err){
			console.trace(err);
			// if we can't read both files email the error to Admin for immediate attention.
			
		}
	});
	
	
	
};

	exports.connection = connection;
	exports.runQuery = runQuery;
	exports.runSelectQuery = runSelectQuery;
	exports.logDatabaseSystemError = logDatabaseSystemError;
