var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");



var createPhotographersTable = function(mysql_con,client){
	
	
	var query = "CREATE TABLE IF NOT EXISTS Photographers(f_name VARCHAR(50),l_name VARCHAR(50),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) NOT NULL UNIQUE,physical_address VARCHAR(50),operating_area VARCHAR(100) NOT NULL,service_code BINARY)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 12;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("create_table_photographers_error");
		
		
	},function(client){
		
		
		var query = "UPDATE Tables SET created = 1 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 25;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("photographers_created");
			
		});
		
		
		
	});
	

};


var createCityTable = function(mysql_con,client){

	query = "CREATE TABLE IF NOT EXISTS City(city_id INTEGER PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50) UNIQUE)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.log(error);
		var file_name = "startup_da_tables.js",
		line_number = 50;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("create_city_photographers_error");
		
	},function(client){
		
		
		var query = "UPDATE Tables SET created = 1 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.log(error);
			var file_name = "startup_da_tables.js",
			line_number = 62;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("city_created");
			
		});
		
	});

};


var createAreasTable = function(mysql_con,client){
	
		query = "CREATE TABLE IF NOT EXISTS Areas(area_id INTEGER PRIMARY KEY AUTO_INCREMENT,city VARCHAR(50) REFERENCES City(name),location VARCHAR(100))";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 84;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			client.emit("create_table_areas_error");
			
		},function(client){
			
			
			var query = "UPDATE Tables SET created = 1 WHERE name='areas'";
    		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    			
    			console.log(error);
    			var file_name = "startup_da_tables.js",
				line_number = 96;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
    		},function(client){
    			
    			client.emit("areas_created");
    			
    		});
			
			
	 });	

};

	
	
	var createPackagesTable = function(mysql_con,client){
		
			query = "CREATE TABLE IF NOT EXISTS Packages(package_id INTEGER PRIMARY KEY AUTO_INCREMENT,print_size VARCHAR(50) UNIQUE,price DECIMAL)";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.log(error);
				var file_name = "startup_da_tables.js",
				line_number = 120;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				client.emit("create_table_packages_error");
				
			},function(client){
				
				
				var query = "UPDATE Tables SET created = 1 WHERE name='packages'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 132;
    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("packages_created");
        			
        		});
    			
		 });
				
	};
		
		
		var createOrdersTable = function(mysql_con,client){
			
				query = "CREATE TABLE IF NOT EXISTS Orders(order_id INTEGER PRIMARY KEY AUTO_INCREMENT,order_from VARCHAR(50) NOT NULL,order_from_id VARCHAR(1000) NOT NULL,order_to VARCHAR(50) NOT NULL,order_date VARCHAR(10) NOT NULL,order_location VARCHAR(50) NOT NULL,order_image_number INTEGER NOT NULL,order_price DECIMAL NOT NUll,order_fullfilled BINARY,order_fullfilled_date VARCHAR(10),order_comments VARCHAR(50))";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.log(error);
					var file_name = "startup_da_tables.js",
					line_number = 155;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					client.emit("create_table_orders_error");
					
				},function(client){
					
					var query = "UPDATE Tables SET created = 1 WHERE name='orders'";
	        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	        			
	        			console.log(error);
	        			var file_name = "startup_da_tables.js",
	    				line_number = 169;
	    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
	    				
	        		},function(client){
	        			
	        			client.emit("orders_created");
	        			
	        		});
	    			
					
			 });
			
		};

			
			var createUserIDsTable = function(mysql_con,client){
				
					query = "CREATE TABLE IF NOT EXISTS UserIDs(user_id INTEGER PRIMARY KEY AUTO_INCREMENT,userId_date_created VARCHAR(50) NOT NULL,userId_hash_value VARCHAR(500) NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 193;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_userids_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='userids'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 205;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("userIDs_created");
		        			
		        		});
		    			
			    		
			    });
			   
			};
			
			var createUsersTable = function(mysql_con,client){
				
					query = "CREATE TABLE IF NOT EXISTS Users(user_id VARCHAR(500) REFERENCES UserIDs(userID_hash_value),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(500) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL,phone_number INTEGER NOT NULL,f_name VARCHAR(50),l_name VARCHAR(50),address VARCHAR(50),city VARCHAR(50),special_directions VARCHAR(50))";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.trace(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 227;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_users_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='users'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 239;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("users_created");
		        			
		        		});
		    			
			    		
			    		
			     });
			    
			};
			
			
			var createAdminTable = function(mysql_con,client){
				
					query = "CREATE TABLE IF NOT EXISTS Admin(username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 236;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_admin_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='admin'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 275;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("admin_created");
		        			
		        		});
		    			
			    		
			    		
			    });
			   
			};
			
			
			var createAdminRightsTable = function(mysql_con,client){
				
					query = "CREATE TABLE IF NOT EXISTS Admin_Rights(admin_rights_id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50) REFERENCES Admin(username),database_area INTEGER NOT NULL,service_providers_area INTEGER NOT NULL,end_users_area INTEGER NOT NULL, system_errors_area INTEGER NOT NULL, system_alerts_area INTEGER NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 299;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_admin_rights_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='admin_rights'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 311;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("admin_rights_created");
		        			
		        		});
		    			
			    });
			  
			};
			
			var createAlertsTable = function(mysql_con,client){
				
					query = "CREATE TABLE IF NOT EXISTS Alerts(new_user_sign_up VARCHAR(5) NOT NULL,new_order VARCHAR(5) NOT NULL,new_provider VARCHAR(5),username VARCHAR(50) REFERENCES Admin(username))";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 334;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_alerts_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='alerts'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 346;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("alerts_created");
		        			
		        		});
		    			
			    		
			    });
			 
			};
			
			
			var createDeliveryMethodTable = function(mysql_con,client){
				
			
					query = "CREATE TABLE IF NOT EXISTS DeliveryMethod(name VARCHAR(50) PRIMARY KEY NOT NULL,description VARCHAR(50) NOT NULL,price DOUBLE NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 370;
						startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
						client.emit("create_table_delivery_method_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='delivery_method'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 382;
		    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("delivery_method_created");
		        			
		        		});
		    			
			    		
			    	});
			  
			};

var createTables = function(client){
	
  
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
    			    createDeliveryMethodTable(mysql_con,client);
    			    
    			    console.log("Tables created");
    			    //mysql_con.end();	

};

var createTablesTable = function(client){
	
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
	
		query = "CREATE TABLE IF NOT EXISTS Tables(name VARCHAR(50) PRIMARY KEY NOT NULL,created BINARY NOT NULL,samples_added BINARY)";
    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    		
    		console.trace(error);
    		var file_name = "startup_da_tables.js",
			line_number = 427;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			client.emit("create_table_tables_error");
    		
    	},function(client){
    		
    		var tables_name = new Array("photographers","packages","orders","areas","city","userids","users","alerts","admin","admin_rights","delivery_method");
    		
    		tables_name.forEach(function(table){
    			console.log(table);
    			var query = "INSERT INTO Tables(name,created,samples_added) VALUES('"+table+"',0,0)";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.trace(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 442;
    				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
    				
        			
        		},function(client){
        			
        			client.emit("tables_table_created");
        			
        		});
    			
    		});
    		
    		
    		
    });
    	
};


var resetSystem = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE admin, admin_rights, alerts, areas, city, deliverymethod, orders, packages, photographers, tables, userids, users";
	
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 472;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("system_reset_error");
		
	},function(client){
		
		client.emit("system_reset");
		
		});
	
	
};

var createOnlyPhotographersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createPhotographersTable(mysql_con,client);


};

var createOnlyPackagesTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createPackagesTable(mysql_con,client);
	
};

var createOnlyOrdersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createOrdersTable(mysql_con,client);
	
};

var createOnlyAreasTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createAreasTable(mysql_con,client);
	
	
};

var createOnlyCityTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createCityTable(mysql_con,client);
	
	
};

var createOnlyUserIDsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createUserIDsTable(mysql_con,client);
	
	
};

var createOnlyUsersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createUsersTable(mysql_con,client);
	
	
};

var createOnlyAdminTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createAdminTable(mysql_con,client);
	
};

var createOnlyAdminRightsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createAdminRightsTable(mysql_con,client);
	
};

var createOnlyAlertsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createAlertsTable(mysql_con,client);
	
};

var createOnlyDeliveryMethodTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	createDeliveryMethodTable(mysql_con,client);
	
	
};


var deletePhotographersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Photographers";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 586;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_photographers_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 598;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='photographers'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 608;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_photographers_deleted");
				
			});
			
		});
		
	});
	
};

var deletePackagesTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Packages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 633;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_packages_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='packages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 645;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='packages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 655;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_packages_deleted");
				
			});
					
		});
		
	});
	
};

var deleteOrdersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Orders";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 680;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_orders_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='orders'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 692;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='orders'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 702;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_orders_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAreasTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Areas";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 727;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_areas_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='areas'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 739;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='areas'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 749;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_areas_deleted");
				
			});
			
		});
		
	});
	
};

var deleteCityTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 774;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 786;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 797;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_city_deleted");
				
			});
			
		});
		
	});
	
};

var deleteDeliveryMethodTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS DeliveryMethod";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 822;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_delivery_method_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='delivery_method'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 834;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
	
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='delivery_method'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 844;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
		
				client.emit("table_delivery_method_deleted");
				
			});
			
		});
		
	});
	
};

var deleteUserIDsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS UserIDs";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 869;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_userIDs_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='userIDs'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 881;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='userIDs'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 892;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_userIDs_deleted");
				
			});
			
			
		});
		
	});
	
};

var deleteUsersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Users";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 921;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_users_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='users'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 930;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='users'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 940;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_users_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAdminTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Admin";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 965;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_admin_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='admin'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 977;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 987;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_admin_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAdminRightsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Admin_Rights";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1012;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_admin_rights_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='admin_rights'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1024;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin_rights'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1034;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_admin_rights_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAlertsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "DROP TABLE IF EXISTS Alerts";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("delete_table_alerts_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='alerts'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='alerts'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_alerts_deleted");
				
			});
			
			
		});
		
	});
	
};


var emptyPhotographersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Photographers";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1108;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_photographers_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1119;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_photographers_emptied");
			
		});
		
	});
	
};

var emptyPackagesTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
		var query = "TRUNCATE TABLE Packages";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1143;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_packages_error");
		
		
	},function(client){
		
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='packages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1155;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_packages_emptied");
			
		});
		
	});
	
};

var emptyOrdersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Orders";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1178;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_orders_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='orders'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1190;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_orders_emptied");
			
		});
		
	});
	
};

var emptyAreasTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
		var query = "TRUNCATE TABLE Areas";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1216;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_areas_error");
		
		
	},function(client){
		
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='areas'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1225;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_areas_emptied");
			
		});
		
	});
	
};

var emptyCityTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1248;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1260;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_city_emptied");
			
		});
		
	});
	
};

var emptyDeliveryMethodTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE DeliveryMethod";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1283;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_delivery_method_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='delivery_method'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1295;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_delivery_method_emptied");
			
		});
		
	});
	
};

var emptyUserIDsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE UserIDs";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1318;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_userIDs_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='userIDs'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1330;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_userIDs_emptied");
			
		});
		
	});
	
};

var emptyUsersTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Users";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1353;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_users_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='users'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1365;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_users_emptied");
			
		});
		
	});
	
};

var emptyAdminTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Admin";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1388;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_admin_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1400;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_admin_emptied");
			
		});
		
	});
	
};

var emptyAdminRightsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Admin_Rights";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1424;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_admin_rights_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin_rights'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1435;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_admin_rights_emptied");
			
		});
		
	});
	
};

var emptyAlertsTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE Alerts";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1459;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_alerts_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='alerts'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1470;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_alerts_emptied");
			
		});
		
	});
	
};

var emptyCityTable = function(client){
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	
	var query = "TRUNCATE TABLE City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("empty_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_city_emptied");
			
		});
		
	});
	
};


var getTablesData = function(client){
	
	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();
	var query = "SELECT * FROM Tables";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		console.log(error);
		//var file_name = "startup_da_tables.js",
		//line_number = 1529;
		//startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
		client.emit("get_tables_data_error");
		
	},function(client,rows,fields){
		
		var tablesData = [];
			
			rows.forEach(function(row){
				
				tablesData.push({
					"name" : row.name,
					"created" : parseInt(row.created),
					"samples_added" : parseInt(row.samples_added)
						});
				
			});
			
			console.log(JSON.stringify(tablesData));
			client.emit("tables_data",JSON.stringify(tablesData));
	
	});
	
	
};

	exports.createTablesTable = createTablesTable;	
	exports.createTables = createTables;
	exports.resetSystem = resetSystem;
	exports.getTablesData = getTablesData;
	
	exports.createOnlyPhotographersTable = createOnlyPhotographersTable;
	exports.createOnlyPackagesTable = createOnlyPackagesTable;
	exports.createOnlyOrdersTable = createOnlyOrdersTable;
	exports.createOnlyAreasTable = createOnlyAreasTable;
	exports.createOnlyCityTable = createOnlyCityTable;
	exports.createOnlyDeliveryMethodTable = createOnlyDeliveryMethodTable;
	exports.createOnlyUserIDsTable = createOnlyUserIDsTable;
	exports.createOnlyUsersTable = createOnlyUsersTable;
	exports.createOnlyAdminTable = createOnlyAdminTable;
	exports.createOnlyAdminRightsTable = createOnlyAdminRightsTable;
	exports.createOnlyAlertsTable = createOnlyAlertsTable;
	
	exports.deletePhotographersTable = deletePhotographersTable;
	exports.deletePackagesTable = deletePackagesTable;
	exports.deleteOrdersTable = deleteOrdersTable;
	exports.deleteAreasTable = deleteAreasTable;
	exports.deleteCityTable = deleteCityTable;
	exports.deleteDeliveryMethodTable = deleteDeliveryMethodTable;
	exports.deleteUserIDsTable = deleteUserIDsTable;
	exports.deleteUsersTable = deleteUsersTable;
	exports.deleteAdminTable = deleteAdminTable;
	exports.deleteAdminRightsTable = deleteAdminRightsTable;
	exports.deleteAlertsTable = deleteAlertsTable;
	
	exports.emptyPhotographersTable = emptyPhotographersTable;
	exports.emptyPackagesTable = emptyPackagesTable;
	exports.emptyOrdersTable = emptyOrdersTable;
	exports.emptyAreasTable = emptyAreasTable;
	exports.emptyCityTable = emptyCityTable;
	exports.emptyDeliveryMethodTable = emptyDeliveryMethodTable;
	exports.emptyUserIDsTable = emptyUserIDsTable;
	exports.emptyUsersTable = emptyUsersTable;
	exports.emptyAdminTable = emptyAdminTable;
	exports.emptyAdminRightsTable = emptyAdminRightsTable;
	exports.emptyAlertsTable = emptyAlertsTable;
	
	exports.logSystemError = startup_da_parent.logSystemError;
	