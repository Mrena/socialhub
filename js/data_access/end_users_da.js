var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

var getAllEndUsers = function(client){
	
	try{
	
	var mysql_con = startup_da_parent.connection();
    mysql_con.connect();
    var query = "SELECT * FROM Users";
    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
    	
    	console.trace(error);
    	client.emit("get_end_users_error");
    	var file_name = "end_users_da.js",
		line_number = 10;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    	
    },function(client,rows,fields){
    	
    	var end_users = Array();
    	rows.forEach(function(row){
    		end_users.push(row);
    	});
    	
 
    	var end_users_fields = Array();
    	fields.forEach(function(field){
    		  end_users_fields.push(field.name);
    	});
    	
    	client.emit("all_end_users",JSON.stringify(end_users));
    	client.emit("end_users_fields",JSON.stringify(end_users_fields));
    });
	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "end_users_da.js",
		line_number = 5;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
};

	var submitEndUser = function(client,objEndUser){
	
		var mysql_con = startup_da_parent.connection();
	    mysql_con.connect();
	    var query = "INSERT INTO Users (username,password,email_address,phone_number,f_name,l_name,address,city) VALUES("+objEndUser.username+","+objEndUser.password+","+objEndUser.email_address+","+objEndUser.phone_number+","+objEndUser.f_name+","+objEndUser.l_name+","+objEndUser.physical_address+","+objEndUser.city+")";
	    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
	    	
	    	console.trace(error);
	    	client.emit("submit_end_user_error");
	    	var file_name = "end_users_da.js",
			line_number = 10;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    	
	    },function(client,rows,fields){
	    	
	    	client.emit("end_user_submitted");
	    	
	    });
		
		
	
	};


exports.getAllEndUsers = getAllEndUsers;
exports.submitEndUser = submitEndUser;
exports.logSystemError = startup_da_parent.logSystemError;