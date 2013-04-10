var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

	var getPrintingProviders = function(client){
	
		var mysql_con = startup_da_parent.connection();
		    mysql_con.connect();
		    var query = "SELECT f_name,l_name,username,email_address,physical_address,operating_area,service_code FROM Photographers";
		    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		    	
		    	console.trace(error);
		    	client.emit("get_printing_provider_error");
		    	
		    },function(client,rows,fields){
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
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
						console.trace(error);
						client.emit("provider_submit_error");
					
					},function(client){
					
						client.emit("provider_submitted");
				});	
	};
	
	var filterServiceProviders = function(client,filter_category,filter_value){
		
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			var query = "SELECT * FROM Photographers WHERE "+filter_category+" LIKE '"+filter_value+"%'";
			startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
				
				console.trace(error);
				
			},function(client,rows,fields){
				
				var providers = Array();
		    	rows.forEach(function(row){
		    		providers.push(row);
		    	});
		    	
		    	client.emit("printing_providers",JSON.stringify(providers));
				
			});
	};
	
	var deleteServiceProvider = function(client,username){
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			var query = "DELETE FROM Photographers WHERE username='"+username+"'";
			    startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    	
			    	console.trace(error);
			    	
			    		},function(client){
			    		getPrintingProviders(client);
			    		
			    });
	};
	
	
	var updateServiceProvider = function(client,objProvider){
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
			var query = "UPDATE Photographers SET f_name = '"+objProvider.f_name+"',l_name='"+objProvider.l_name+"',physical_address='"+objProvider.physical_address+"',operating_area='"+objProvider.operating_area+"' WHERE username = '"+objProvider.username+"'";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					
						},function(client){
							getPrintingProviders(client);
				
				});
		};
		
		
	var updateProviderPassword = function(client,old_password,new_password,username){
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		
		var query = "UPDATE Photographers SET password = '"+new_password+"  WHERE username = '"+username+"' AND password='"+old_password+"' ";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				
				},function(client){
					client.emit("password_updated");
			});
		
		
	};	
	
	
	var getAllOperatingAreas = function(client){
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT operating_area FROM Photographers";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			
		},function(client,rows,fields){
			
			var operating_areas = Array();
	    	rows.forEach(function(row){
	    		operating_areas.push(row.operating_area);
	    	});
	    	
	    	client.emit("operating_areas",JSON.stringify(operating_areas));
		});
		
	};
	
	var isProviderUsernameTaken = function(client,username){
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT username FROM Photographers WHERE username='"+username+"' ";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			
		},function(client,rows,fields){
			
			
			if(rows != undefined && rows[0] != undefined){
				client.emit("provider_username_taken");
			}
		});
		
		
	};
	
	var validateProvider = function(client,username,password){
		
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT username,password FROM Photographers WHERE username='"+username+"' AND password='"+password+"' ";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			
		},function(client,rows,fields){
			var validated = {
					"isValid" : true
				};
			
			if(rows != undefined && rows[0] != undefined){
				
				client.emit("service_provider_validated",JSON.stringify(validated));
				
					}else{
						
						validated.isValid = false;
						client.emit("service_provider_validated",JSON.stringify(validated));
						
					}
		});
		
		
	};
	
	
	exports.getPrintingProviders = getPrintingProviders;
	exports.submitPrintingProvider = submitPrintingProvider;
	exports.filterServiceProviders = filterServiceProviders;
	exports.deleteServiceProvider = deleteServiceProvider;
	exports.updateServiceProvider = updateServiceProvider;
	exports.updateProviderPassword = updateProviderPassword;
	exports.getAllOperatingAreas = getAllOperatingAreas;
	exports.isProviderUsernameTaken = isProviderUsernameTaken;
	exports.validateProvider = validateProvider;