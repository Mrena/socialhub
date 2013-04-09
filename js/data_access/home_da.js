	var mysql = require("mysql");
	var fs = require("fs");
	var startup_da_parent = require("./startup_da_parent");
	
	
	var getCities = function(client){
		
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
	    
	    
	    var getPackages = function(client){
	    	
	    	var mysql_con = startup_da_parent.connection();
			var query = "SELECT print_size,price FROM Packages";
			startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,rows,fields){
				
				var packages = Array();
				rows.forEach(function(row){
					packages.push({"print_size" : row.print_size,"price" : row.price});
				});
				
				client.emit("packages",JSON.stringify(packages));
			});
	    	
	    };
	
	
	    exports.getCities = getCities;
	    exports.getPackages = getPackages;



