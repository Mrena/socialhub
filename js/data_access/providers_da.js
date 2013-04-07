var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

	var getPrintingProviders = function(client){
	
		var mysql_con = startup_da_parent.connection();
		    mysql_con.connect();
		    var query = "SELECT f_name,l_name,username,email_address,physical_address,operating_area,service_code FROM Photographers";
		    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,rows,fields){
		    	var providers = Array();
		    	rows.forEach(function(row){
		    		providers.push(row);
		    	});
		    	
		 
		    	var provider_fields = Array();
		    	fields.forEach(function(field){
		    		  provider_fields.push(field.name);
		    	});
		    	
		    	client.emit("printing_providers",JSON.stringify(providers));
		    	client.emit("printing_providers_fields",JSON.stringify(provider_fields));
		    });
		    
	};
	
	var submitPrintingProvider = function(client,provider){
			
		   	var objProvider = JSON.parse(provider),
		   	    service_code = 1;
			var mysql_con = startup_da_parent.connection();
				mysql_con.connect();
				
				var query = "INSERT INTO Photographers VALUES('"+objProvider.f_name+"','"+objProvider.l_name+"','"+objProvider.username+"','"+objProvider.password+"','"+objProvider.email_address+"','"+objProvider.physical_address+"','"+objProvider.operating_area+"',"+service_code+")";
				startup_da_parent.runQuery(query,mysql_con,client,function(client){
					client.emit("provider_submiited");
				});	
	};
	
	var filterServiceProviders = function(client,filter_obj){
		filter_obj = JSON.parse(filter_obj);
		var filter_category = filter_obj.filter_category,
			filter_value = filter_obj.filter_value;
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			console.log("filter field "+filter_category);
			console.log("filter value "+filter_value);
			var query = "SELECT * FROM Photographers WHERE "+filter_category+" LIKE '"+filter_value+"%'";
			startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,rows,fields){
				
				var providers = Array();
		    	rows.forEach(function(row){
		    		providers.push(row);
		    	});
		    	
		    	client.emit("printing_providers",JSON.stringify(providers));
				
			});
	};


	exports.getPrintingProviders = getPrintingProviders;
	exports.submitPrintingProvider = submitPrintingProvider;
	exports.filterServiceProviders = filterServiceProviders;