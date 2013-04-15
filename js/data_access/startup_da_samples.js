var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

var addSampleData = function(client){
	
	
var addSamplePhotographers = function(client,mysql_con){
	
	try{
	
		query = "INSERT INTO photographers (f_name,l_name,username,password,email_address,physical_address,operating_area,service_code) VALUES('Kendrick','Lamar','Ken','12345','ken@gmail.com','Durban','Chatsworth',1)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_samples.js",
			line_number = 13;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			query = "INSERT INTO photographers (f_name,l_name,username,password,email_address,physical_address,operating_area,service_code) VALUES('Joey','Badass','Joey','12345','joey@gmail.com','Empangeni','KwaDlangezwa',1)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.trace(error);
	    		var file_name = "startup_da_samples.js",
				line_number = 23;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    		
	    	},function(client){
	    		
	    		client.emit("sample_photographers_added");
	    		
	    	});
			
		});
    	
    	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "startup_da_samples.js",
		line_number = 8;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
		
};

var addSampleCities = function(client,mysql_con){
	
	try{
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		query = "INSERT INTO City(name) VALUES('Durban')";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_samples.js",
			line_number = 53;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			query = "INSERT INTO City(name) VALUES('Empangeni')";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.trace(error);
	    		var file_name = "startup_da_samples.js",
				line_number = 63;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    		
	    	},function(client){
	    		
	    		client.emit("sample_cities_added");
	    	});
			
		});
    	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "startup_da_samples.js",
		line_number = 49;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
};

var addSampleAreas = function(client,mysql_con){
	
	try{
		query = "INSERT INTO Areas(city,location) VALUES('Empangeni','KwaDlangezwe')";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_samples.js",
			line_number = 92;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			query = "INSERT INTO Areas(city,location) VALUES('Empangeni','Esikhawini')";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.trace(error);
	    		var file_name = "startup_da_samples.js",
				line_number = 98;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    		
	    	},function(client){
	    		
	    		query = "INSERT INTO Areas(city,location) VALUES('Durban','Umlazi')";
	        	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	        		
	        		console.trace(error);
	        		var file_name = "startup_da_samples.js",
	    			line_number = 108;
	    			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	        		
	        	},function(client){
	        		
	        		query = "INSERT INTO Areas(city,location) VALUES('Durban','Durban Central')";
	            	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	            		
	            		console.trace(error);
	            		var file_name = "startup_da_samples.js",
	        			line_number = 118;
	        			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	            		
	            	},function(client){
	            		
	            		query = "INSERT INTO Areas(city,location) VALUES('Durban','Durban Central')";
	                	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	                		
	                		console.trace(error);
	                		var file_name = "startup_da_samples.js",
	            			line_number = 128;
	            			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	                		
	                	},function(client){
	                		
	                		query = "INSERT INTO Areas(city,location) VALUES('Durban','Isipingo')";
	                    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	                    		
	                    		console.trace(error);
	                    		var file_name = "startup_da_samples.js",
	                			line_number = 138;
	                			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	                    		
	                    	},function(client){
	                    		
	                    		query = "INSERT INTO Areas(city,location) VALUES('Durban','Chatsworth')";
	                        	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	                        		
	                        		console.trace(error);
	                        		var file_name = "startup_da_samples.js",
	                    			line_number = 148;
	                    			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	                        		
	                        	},function(client){
	                        		
	                        		client.emit("sample_areas_added");
	                        		
	                        	});
	                    		
	                    	});
	                		
	                	});
	            		
	            	});
	        		
	        	});
	    		
	    	});
			
		});
    	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "startup_da_samples.js",
		line_number = 89;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}

};

var addSamplePackages = function(client,mysql_con){
	
	try{
		
		query = "INSERT INTO Packages(print_size,price) VALUES('16x16',16.00)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_samples.js",
			line_number = 185;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			query = "INSERT INTO Packages(print_size,price) VALUES('24x24',24.00)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.trace(error);
	    		var file_name = "startup_da_samples.js",
				line_number = 195;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    		
	    	},function(client){
	    		
	    		query = "INSERT INTO Packages(print_size,price) VALUES('64x64',64.00)";
	        	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	        		
	        		console.trace(error);
	        		var file_name = "startup_da_samples.js",
	    			line_number = 205;
	    			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	        		
	        	},function(client){
	        		client.emit("sample_packages_added");
	        	});
	    		
	    	});
			
		});
    	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "startup_da_samples.js",
		line_number = 188;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
};

var addSampleOrders = function(client,mysql_con){
	
	try{
		query = "INSERT INTO Orders (order_from,order_to,order_from_id,order_date,order_location,order_image_number,order_price) VALUES('Khulekani Ngongoma','Mrena Systems','122637783920','04-05-1012','Umlazi',1,16)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_samples.js",
			line_number = 232;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			client.emit("sample_orders_added");
		});
    	
    	
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "startup_da_samples.js",
		line_number = 238;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
};


	var addSampleUserIDs = function(client,mysql_con){
	
		try{
			query = "INSERT INTO UserIDs (userId_date_created,unique_hash_value) VALUES('04-05-2013','1s226d37ds783d9c20')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_samples.js",
				line_number = 255;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				client.emit("sample_userIDs_added");
					});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "startup_da_samples.js",
			line_number = 264;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
	
	};
	
	
	var addSampleUsers = function(client,mysql_con){
		
		try{
			query = "INSERT INTO Users(userid,username,password,email_address,phone_number,f_name,l_name,address,city,special_directions) VALUES('1s226d37ds783d9c20','Mrena','mrena','mrena.pro@gmail.com',0784646803,'Khulekani','Ngongoma','B731 Umlazi for now','Durban','Go right...')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_samples.js",
				line_number = 294;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				client.emit("sample_users_added");
					});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "startup_da_samples.js",
			line_number = 290;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
	
	};
	
	var addSampleAdmin = function(client,mysql_con){
		
		try{
			query = "INSERT INTO Admin (username,password,email_address) VALUES('Mrena','mrena','mrena.pro@gmail.com')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_samples.js",
				line_number = 319;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				client.emit("sample_admin_added");
					});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "startup_da_samples.js",
			line_number = 315;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
	
	};
	
	var addSampleAdminRights = function(client,mysql_con){
		
		try{
			query = "INSERT INTO Admin_Rights (user_id,userId_date_created,unique_hash_value) VALUES('1','04-05-2013','1s226d37ds783d9c20')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_samples.js",
				line_number = 255;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				client.emit("sample_userIDs_added");
					});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "startup_da_samples.js",
			line_number = 264;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
	
	};
	
	var addSampleAlerts = function(client,mysql_con){
		
		try{
			query = "INSERT INTO Alerts (new_user_sign_up,new_order,new_provider,username) VALUES('email','email','email','Mrena')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_samples.js",
				line_number = 369;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				client.emit("sample_alerts_added");
					});
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "startup_da_samples.js",
			line_number = 365;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
	
	};

	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();

	addSamplePhotographers(client,mysql_con);
	addSampleCities(client,mysql_con);
	addSampleAreas(client,mysql_con);
	addSamplePackages(client,mysql_con);
	addSampleOrders(client,mysql_con);
	addSampleUserIDs(client,mysql_con);
	addSampleUsers(client,mysql_con);
	addSampleAdmin(client,mysql_con);
	addSampleAdminRights(client,mysql_con);
	addSampleAlerts(client,mysql_con);
	//mysql_con.end();
	
	

};

	exports.addSampleData = addSampleData;
	exports.logSystemError = startup_da_parent.logSystemError;