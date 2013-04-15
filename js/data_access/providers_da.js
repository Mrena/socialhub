var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

	var getPrintingProviders = function(client){
	
		try{
		
		var mysql_con = startup_da_parent.connection();
		    mysql_con.connect();
		    var query = "SELECT f_name,l_name,username,email_address,physical_address,operating_area,service_code FROM Photographers";
		    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		    	
		    	console.trace(error);
		    	client.emit("get_printing_provider_error");
		    	var file_name = "providers_da.js",
				line_number = 10;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    	
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
		    
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 5;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		    
	};
	
	var submitPrintingProvider = function(client,provider){
			
		try{
		
		   	var objProvider = JSON.parse(provider),
		   	    service_code = 1;
			var mysql_con = startup_da_parent.connection();
				mysql_con.connect();
				
				var query = "INSERT INTO Photographers VALUES('"+objProvider.f_name+"','"+objProvider.l_name+"','"+objProvider.username+"','"+objProvider.password+"','"+objProvider.email_address+"','"+objProvider.physical_address+"','"+objProvider.operating_area+"',"+service_code+")";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
						console.trace(error);
						client.emit("provider_submit_error");
						var file_name = "providers_da.js",
						line_number = 43;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
					},function(client){
					
						client.emit("provider_submitted");
				});	
				
				
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 46;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}	
				
				
	};
	
	var filterServiceProviders = function(client,filter_category,filter_value){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			var query = "SELECT * FROM Photographers WHERE "+filter_category+" LIKE '"+filter_value+"%'";
			startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
				
				console.trace(error);
				var file_name = "providers_da.js",
				line_number = 64;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client,rows,fields){
				
				var providers = Array();
		    	rows.forEach(function(row){
		    		providers.push(row);
		    	});
		    	
		    	client.emit("printing_providers",JSON.stringify(providers));
				
			});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 81;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
			
	};
	
	var deleteServiceProvider = function(client,username){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			var query = "DELETE FROM Photographers WHERE username='"+username+"'";
			    startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    	
			    	console.trace(error);
			    	var file_name = "providers_da.js",
					line_number = 88;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			    	
			    		},function(client){
			    		getPrintingProviders(client);
			    		
			    });
			    
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 116;
			startup_da_parent.logSystemError(error,file_name,line_number);
		} 
			    
			    
	};
	
	
	var updateServiceProvider = function(client,objProvider){
		
		
		try{
		
		var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
			var query = "UPDATE Photographers SET f_name = '"+objProvider.f_name+"',l_name='"+objProvider.l_name+"',physical_address='"+objProvider.physical_address+"',operating_area='"+objProvider.operating_area+"' WHERE username = '"+objProvider.username+"'";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					var file_name = "providers_da.js",
					line_number = 108;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
						},function(client){
							getPrintingProviders(client);
				
				});
				
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 147;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
				
				
		};
		
		
	var updateProviderPassword = function(client,old_password,new_password,username){
		
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		
			var query = "UPDATE Photographers SET password = '"+new_password+"  WHERE username = '"+username+"' AND password='"+old_password+"' ";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "providers_da.js",
				line_number = 128;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
				},function(client){
					client.emit("password_updated");
			});
			
			
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "providers_da.js",
		line_number = 180;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
		
		
	};	
	
	
	var getAllOperatingAreas = function(client){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT operating_area FROM Photographers";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			var file_name = "providers_da.js",
			line_number = 148;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client,rows,fields){
			
			var operating_areas = Array();
	    	rows.forEach(function(row){
	    		operating_areas.push(row.operating_area);
	    	});
	    	
	    	client.emit("operating_areas",JSON.stringify(operating_areas));
		});
		
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 213;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
	};
	
	var isProviderUsernameTaken = function(client,username){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT username FROM Photographers WHERE username='"+username+"' ";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			var file_name = "providers_da.js",
			line_number = 172;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client,rows,fields){
			
			
			if(rows != undefined && rows[0] != undefined){
				client.emit("provider_username_taken");
			}
		});
		
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 247;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
		
	};
	
	var validateProvider = function(client,username,password){
		
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT username,password FROM Photographers WHERE username='"+username+"' AND password='"+password+"' ";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			var file_name = "providers_da.js",
			line_number = 196;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client,rows,fields){
			var validated = {
					"isValid" : true
				};
			
			if(rows != undefined && rows[0] != undefined){
				
				client.emit("service_provider_validated",JSON.stringify(validated));
				//client.set("username",username);
				//console.log(username);
					}else{
						
						validated.isValid = false;
						client.emit("service_provider_validated",JSON.stringify(validated));
						
					}
		});
		
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 280;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
		
	};
	
	var getProviderEditableInfo = function(client,username){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		var query = "SELECT f_name,l_name,password,email_address,physical_address FROM Photographers WHERE username = '"+username+"' ";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			console.trace(error);
			var file_name = "providers_da.js",
			line_number = 229;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client,rows,fields){
			
			
			if(rows[0] != undefined){
				
				var providerInfo = {
						"f_name" : rows[0].f_name,
						"l_name" : rows[0].l_name,
						"password" : rows[0].password,
						"email_address" : rows[0].email_address,
						"physical_address" : rows[0].physical_address
				};
				
			client.emit("service_provider_info",JSON.stringify(providerInfo));
			
			}
	    	
		});
		
		
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 324;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
	};
	
	var updateProviderInfo = function(client,objProvider){
		
		try{
		
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		
			var query = "UPDATE Photographers SET f_name ='"+objProvider.f_name+"', l_name = '"+objProvider.l_name+"', password = '"+objProvider.password+"',email_address = '"+objProvider.email_address+"',physical_address = '"+objProvider.physical_address+"'  WHERE username = '"+objProvider.username+"' ";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				client.emit("provider_edit_error");
				var file_name = "providers_da.js",
				line_number = 263;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
				
				},function(client){
					
					client.emit("provider_edit_success");
			});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "providers_da.js",
			line_number = 368;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
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
	exports.getProviderEditableInfo = getProviderEditableInfo;
	exports.updateProviderInfo = updateProviderInfo;
	exports.logSystemError = startup_da_parent.logSystemError;
	