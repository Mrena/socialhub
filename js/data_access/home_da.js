	var mysql = require("mysql");
	var fs = require("fs");
	var startup_da_parent = require("./startup_da_parent");
	
	var getCities = function(client,mysql_con){
		
		var query = "SELECT name FROM City";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			
			var file_name = "home_da.js",
			line_number = 10;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
			
		},function(client,rows,fields){
			
		
			var cities = Array();
			rows.forEach(function(row){
				cities.push(row.name);
			});
			
			client.emit("cities",cities);
			
			
		});
		
	};
	    
	    
	    var getPackages = function(client,mysql_con){
	    	
	    	
			var query = "SELECT print_size,price FROM Packages";
			startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
				
				console.trace(error);
				var file_name = "home_da.js",
				line_number = 39;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
				
			},function(client,rows,fields){
				
				var packages = Array();
				rows.forEach(function(row){
					packages.push({"print_size" : row.print_size,"price" : row.price});
				});
				
				client.emit("packages",JSON.stringify(packages));
			});
	    	
	    };
	
	
	    exports.getCities = getCities;
	    exports.getPackages = getPackages;
	    exports.logSystemError = startup_da_parent.logSystemError;



