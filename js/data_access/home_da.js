	var mysql = require("mysql");
	var fs = require("fs");
	var startup_da_parent = require("./startup_da_parent");
	
	
	var get_cities = function(client){
		
		var mysql_con = startup_da_parent.connection();
		var query = "SELECT name FROM City";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,rows,fields){
			
			console.trace("in virtual method");
			console.log(rows[0]);
			
			var cities = Array();
			rows.forEach(function(row){
				cities.push(row.name);
			});
			
			client.emit("cities",cities);
			
			
		});
		
		
		
	    };
	
	
exports.get_cities = get_cities;	


