var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");


var createTables = function(client){
	
    var createPhotographersTable = function(mysql_con,client){
    	
    	try{
    		
    		var query = "CREATE TABLE Photographers(f_name VARCHAR(50),l_name VARCHAR(50),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) NOT NULL UNIQUE,physical_address VARCHAR(50),operating_area VARCHAR(100) NOT NULL,service_code BINARY)";
    		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    			
    			console.trace(error);
    			var file_name = "startup_da_tables.js",
				line_number = 13;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				socket.emit("create_table_photographers_error");
				
    			
    		},function(client){
    			client.emit("photographers_created");
    		});
    		
    	}catch(error){
    		// System error logging
    		console.log(error);
    		var file_name = "startup_da_tables.js",
    		line_number = 8;
    		startup_da_parent.logSystemError(error,file_name,line_number);
    	}
    };
    
    
    var createCityTable = function(mysql_con,client){
    	try{
    		query = "CREATE TABLE City(city_id INTEGER PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50) UNIQUE)";
    		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    			
    			console.trace(error);
    			var file_name = "startup_da_tables.js",
				line_number = 36;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				socket.emit("create_city_photographers_error");
    			
    		},function(client){
    			client.emit("city_created");
    		});
    		
    	}catch(error){
    		// System error logging
    		console.log(error);
    		var file_name = "startup_da_tables.js",
    		line_number = 36;
    		startup_da_parent.logSystemError(error,file_name,line_number);
    	}

    	};
    	
    	
    	var createAreasTable = function(mysql_con,client){
    		try{
    			query = "CREATE TABLE Areas(area_id INTEGER PRIMARY KEY AUTO_INCREMENT,city VARCHAR(50) REFERENCES City(name),location VARCHAR(100))";
    			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				
    				console.trace(error);
    				var file_name = "startup_da_tables.js",
    				line_number = 61;
    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    				socket.emit("create_table_areas_error");
    				
    			},function(client){
    				client.emit("areas_created");
    				});	
    			
    		}catch(error){
        		// System error logging
        		console.log(error);
        		var file_name = "startup_da_tables.js",
        		line_number = 62;
        		startup_da_parent.logSystemError(error,file_name,line_number);
        	}
    	};

    		
    		
    		var createPackagesTable = function(mysql_con,client){
    			try{
    				query = "CREATE TABLE Packages(package_id INTEGER PRIMARY KEY AUTO_INCREMENT,print_size VARCHAR(50) UNIQUE,price DECIMAL)";
    				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    					
    					console.trace(error);
    					var file_name = "startup_da_tables.js",
    					line_number = 84;
    					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    					socket.emit("create_table_packages_error");
    					
    				},function(client){
    					client.emit("packages_created");
    					});
    					
    			}catch(error){
    	    		// System error logging
    	    		console.log(error);
    	    		var file_name = "startup_da_tables.js",
    	    		line_number = 88;
    	    		startup_da_parent.logSystemError(error,file_name,line_number);
    	    	}
    		};
    			
    			
    			var createOrdersTable = function(mysql_con,client){
    				try{
    					query = "CREATE TABLE Orders(order_id INTEGER PRIMARY KEY AUTO_INCREMENT,order_from VARCHAR(50) NOT NULL,order_from_id VARCHAR(1000) NOT NULL,order_to VARCHAR(50) NOT NULL,order_date VARCHAR(10) NOT NULL,order_location VARCHAR(50) NOT NULL,order_image_number INTEGER NOT NULL,order_price DECIMAL NOT NUll,order_fullfilled BINARY,order_fullfilled_date VARCHAR(10),order_comments VARCHAR(50))";
    					startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    						
    						console.trace(error);
    						var file_name = "startup_da_tables.js",
    						line_number = 106;
    						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    						socket.emit("create_table_orders_error");
    						
    					},function(client){
    						
    						client.emit("orders_created");
    						
    						
    						});
    					
    				}catch(error){
    		    		// System error logging
    		    		console.log(error);
    		    		var file_name = "startup_da_tables.js",
    		    		line_number = 113;
    		    		startup_da_parent.logSystemError(error,file_name,line_number);
    		    	}
    				};

    				
    				var createUserIDsTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE UserIDs(user_id INTEGER PRIMARY KEY AUTO_INCREMENT,userId_date_created VARCHAR(50) NOT NULL,userId_hash_value VARCHAR(500) NOT NULL)";
    				    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				    		
    				    		console.trace(error);
    				    		var file_name = "startup_da_tables.js",
    							line_number = 132;
    							startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    							socket.emit("create_table_userids_error");
    				    		
    				    	},function(client){
    				    		client.emit("userIDs_created");
    				    		});
    				    	
    					}catch(error){
    			    		// System error logging
    			    		console.log(error);
    			    		var file_name = "startup_da_tables.js",
    			    		line_number = 141;
    			    		startup_da_parent.logSystemError(error,file_name,line_number);
    			    	}
    				};
    				
    				var createUsersTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE Users(user_id VARCHAR(500) REFERENCES UserIDs(userID_hash_value),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(500) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL,phone_number INTEGER NOT NULL,f_name VARCHAR(50),l_name VARCHAR(50),address VARCHAR(50),city VARCHAR(50),special_directions VARCHAR(50))";
    				    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				    		
    				    		console.trace(error);
    				    		var file_name = "startup_da_tables.js",
    							line_number = 171;
    							startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    							socket.emit("create_table_users_error");
    				    		
    				    	},function(client){
    				    		client.emit("users_created");
    				    		});
    				    	
    					}catch(error){
    			    		// System error logging
    			    		console.log(error);
    			    		var file_name = "startup_da_tables.js",
    			    		line_number = 167;
    			    		startup_da_parent.logSystemError(error,file_name,line_number);
    			    	}
    				};
    				
    				
    				var createAdminTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE Admin(username VARCHAR(500) PRIMARY KEY NOT NULL,password VARCHAR(500) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL)";
    				    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				    		
    				    		console.trace(error);
    				    		var file_name = "startup_da_tables.js",
    							line_number = 199;
    							startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    							socket.emit("create_table_admin_error");
    				    		
    				    	},function(client){
    				    		client.emit("admin_created");
    				    		});
    				    	
    					}catch(error){
    			    		// System error logging
    			    		console.log(error);
    			    		var file_name = "startup_da_tables.js",
    			    		line_number = 194;
    			    		startup_da_parent.logSystemError(error,file_name,line_number);
    			    	}
    				};
    				
    				
    				var createAdminRightsTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE Admin_Rights(user_id VARCHAR(500) REFERENCES UserIDs(userID_hash_value),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(500) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL,phone_number INTEGER NOT NULL,f_name VARCHAR(50),l_name VARCHAR(50),address VARCHAR(50),city VARCHAR(50),special_directions VARCHAR(50))";
    				    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				    		
    				    		console.trace(error);
    				    		var file_name = "startup_da_tables.js",
    							line_number = 225;
    							startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    							socket.emit("create_table_admin_rights_error");
    				    		
    				    	},function(client){
    				    		client.emit("admin_rights_created");
    				    		});
    				    	
    					}catch(error){
    			    		// System error logging
    			    		console.log(error);
    			    		var file_name = "startup_da_tables.js",
    			    		line_number = 221;
    			    		startup_da_parent.logSystemError(error,file_name,line_number);
    			    	}
    				};
    				
    				var createAlertsTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE Alerts(new_user_sign_up VARCHAR(5) NOT NULL,new_order VARCHAR(5) NOT NULL,new_provider VARCHAR(5),username VARCHAR(50) REFERENCES Admin(username))";
    				    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    				    		
    				    		console.trace(error);
    				    		var file_name = "startup_da_tables.js",
    							line_number = 252;
    							startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    							socket.emit("create_table_alerts_error");
    				    		
    				    	},function(client){
    				    		client.emit("alerts_created");
    				    		});
    				    	
    					}catch(error){
    			    		// System error logging
    			    		console.log(error);
    			    		var file_name = "startup_da_tables.js",
    			    		line_number = 247;
    			    		startup_da_parent.logSystemError(error,file_name,line_number);
    			    	}
    				};
    				
    				var mysql_con = startup_da_parent.connection();
    			    mysql_con.connect();
    			    createPhotographersTable(mysql_con,client);
    			    createCityTable(mysql_con,client);
    			    createAreasTable(mysql_con,client);
    			    createPackagesTable(mysql_con,client);
    			    createOrdersTable(mysql_con,client);
    			    createUserIDsTable(mysql_con,client);
    			    createUsersTable(mysql_con,client);
    			    createAdminTable(mysql_con,client);
    			    createAdminRightsTable(mysql_con,client);
    			    createAlertsTable(mysql_con,client);
    			    
    			    console.log("Tables created");
    			    //mysql_con.end();	

};

		
	exports.createTables = createTables;
	exports.logSystemError = startup_da_parent.logSystemError;
	