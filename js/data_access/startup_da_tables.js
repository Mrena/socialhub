var startup_da_parent = require("./startup_da_parent");


var createPhotographersTable = function(client,mysql_con,fs){
	
	
	var query = "CREATE TABLE IF NOT EXISTS Photographers(f_name VARCHAR(50),l_name VARCHAR(50),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) NOT NULL UNIQUE,physical_address VARCHAR(50),operating_area VARCHAR(100) NOT NULL,service_code BINARY)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 12;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("create_table_photographers_error");
		
		
	},function(client){
		
		
		var query = "UPDATE Tables SET created = 1 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 25;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("photographers_created");
			
		});
		
		
		
	});
	

};


var createCityTable = function(client,mysql_con,fs){

	query = "CREATE TABLE IF NOT EXISTS City(city_id INTEGER PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50) UNIQUE)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.log(error);
		var file_name = "startup_da_tables.js",
		line_number = 50;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("create_city_photographers_error");
		
	},function(client){
		
		
		var query = "UPDATE Tables SET created = 1 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.log(error);
			var file_name = "startup_da_tables.js",
			line_number = 62;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("city_created");
			
		});
		
	});

};


var createAreasTable = function(client,mysql_con,fs){
	
		query = "CREATE TABLE IF NOT EXISTS Areas(area_id INTEGER PRIMARY KEY AUTO_INCREMENT,city VARCHAR(50) REFERENCES City(name),location VARCHAR(100))";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 84;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			client.emit("create_table_areas_error");
			
		},function(client){
			
			
			var query = "UPDATE Tables SET created = 1 WHERE name='areas'";
    		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    			
    			console.log(error);
    			var file_name = "startup_da_tables.js",
				line_number = 96;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
    		},function(client){
    			
    			client.emit("areas_created");
    			
    		});
			
			
	 });	

};

	
	
	var createPackagesTable = function(client,mysql_con,fs){
		
			query = "CREATE TABLE IF NOT EXISTS Packages(package_id INTEGER PRIMARY KEY AUTO_INCREMENT,print_size VARCHAR(50) UNIQUE,price DECIMAL)";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.log(error);
				var file_name = "startup_da_tables.js",
				line_number = 120;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("create_table_packages_error");
				
			},function(client){
				
				
				var query = "UPDATE Tables SET created = 1 WHERE name='packages'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 132;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("packages_created");
        			
        		});
    			
		 });
				
	};
		
		
		var createOrdersTable = function(client,mysql_con,fs){
			
				query = "CREATE TABLE IF NOT EXISTS Orders(order_id INTEGER PRIMARY KEY AUTO_INCREMENT,order_from VARCHAR(50) NOT NULL,order_from_id VARCHAR(1000) NOT NULL,order_to VARCHAR(50) NOT NULL,order_date VARCHAR(10) NOT NULL,order_location VARCHAR(50) NOT NULL,order_image_number INTEGER NOT NULL,order_price DECIMAL NOT NUll,order_fullfilled BINARY,order_fullfilled_date VARCHAR(10),order_comments VARCHAR(50))";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.log(error);
					var file_name = "startup_da_tables.js",
					line_number = 155;
					startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
					client.emit("create_table_orders_error");
					
				},function(client){
					
					var query = "UPDATE Tables SET created = 1 WHERE name='orders'";
	        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	        			
	        			console.log(error);
	        			var file_name = "startup_da_tables.js",
	    				line_number = 169;
	    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
	    				
	        		},function(client){
	        			
	        			client.emit("orders_created");
	        			
	        		});
	    			
					
			 });
			
		};

			
			var createUserIDsTable = function(client,mysql_con,fs){
				
					query = "CREATE TABLE IF NOT EXISTS UserIDs(user_id INTEGER PRIMARY KEY AUTO_INCREMENT,userId_date_created VARCHAR(50) NOT NULL,userId_hash_value VARCHAR(500) NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 193;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_userids_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='userids'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 205;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("userIDs_created");
		        			
		        		});
		    			
			    		
			    });
			   
			};
			
			var createUsersTable = function(client,mysql_con,fs){
				
					query = "CREATE TABLE IF NOT EXISTS Users(user_id VARCHAR(500) REFERENCES UserIDs(userID_hash_value),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(500) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL,phone_number INTEGER NOT NULL,f_name VARCHAR(50),l_name VARCHAR(50),address VARCHAR(50),city VARCHAR(50),special_directions VARCHAR(50))";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.trace(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 227;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_users_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='users'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 239;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("users_created");
		        			
		        		});
		    			
			    		
			    		
			     });
			    
			};
			
			
			var createAdminTable = function(client,mysql_con,fs){
				
					query = "CREATE TABLE IF NOT EXISTS Admin(username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) UNIQUE NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 236;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_admin_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='admin'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 275;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("admin_created");
		        			
		        		});
		    			
			    		
			    		
			    });
			   
			};
			
			
			var createAdminRightsTable = function(client,mysql_con,fs){
				
					query = "CREATE TABLE IF NOT EXISTS Admin_Rights(admin_rights_id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50) REFERENCES Admin(username),database_area INTEGER NOT NULL,service_providers_area INTEGER NOT NULL,end_users_area INTEGER NOT NULL, system_errors_area INTEGER NOT NULL, system_alerts_area INTEGER NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 299;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_admin_rights_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='admin_rights'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 311;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("admin_rights_created");
		        			
		        		});
		    			
			    });
			  
			};
			
			var createAlertsTable = function(client,mysql_con,fs){
				
					query = "CREATE TABLE IF NOT EXISTS Alerts(new_user_sign_up VARCHAR(5) NOT NULL,new_order VARCHAR(5) NOT NULL,new_provider VARCHAR(5),username VARCHAR(50) REFERENCES Admin(username))";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 334;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_alerts_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='alerts'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 346;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("alerts_created");
		        			
		        		});
		    			
			    		
			    });
			 
			};
			
			
			var createDeliveryMethodTable = function(client,mysql_con,fs){
				
			
					query = "CREATE TABLE IF NOT EXISTS DeliveryMethod(name VARCHAR(50) PRIMARY KEY NOT NULL,description VARCHAR(50) NOT NULL,price DOUBLE NOT NULL)";
			    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    		
			    		console.log(error);
			    		var file_name = "startup_da_tables.js",
						line_number = 370;
						startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
						client.emit("create_table_delivery_method_error");
			    		
			    	},function(client){
			    		
			    		
			    		var query = "UPDATE Tables SET created = 1 WHERE name='delivery_method'";
		        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		        			
		        			console.log(error);
		        			var file_name = "startup_da_tables.js",
		    				line_number = 382;
		    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		    				
		        		},function(client){
		        			
		        			client.emit("delivery_method_created");
		        			
		        		});
		    			
			    		
			    	});
			  
			};
			
		var createMessagesTable = function(client,mysql_con,fs){
			
			
			query = "CREATE TABLE IF NOT EXISTS Messages(message_id INTEGER PRIMARY KEY AUTO_INCREMENT,user_from VARCHAR(100) NOT NULL,user_to VARCHAR(50) NOT NULL,message VARCHAR(1000) NOT NULL,is_read BINARY NOT NULL)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.log(error);
	    		var file_name = "startup_da_tables.js",
				line_number = 370;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("create_table_messages_error");
	    		
	    	},function(client){
	    		
	    		
	    		var query = "UPDATE Tables SET created = 1 WHERE name='messages'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 382;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("messages_created");
        			
        		});
    			
	    		
	    	});
			
			
			
		};
		
		var createReplyMessagesTable = function(client,mysql_con,fs){
			
			
			query = "CREATE TABLE IF NOT EXISTS Reply_Messages(reply_id INTEGER PRIMARY KEY AUTO_INCREMENT,reply_from VARCHAR(50) NOT NULL,reply_to INTEGER REFERENCES Messages(message_id),reply_message VARCHAR(1000) NOT NULL,reply_number INTEGER NOT NULL)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.log(error);
	    		var file_name = "startup_da_tables.js",
				line_number = 370;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("create_table_reply_messages_error");
	    		
	    	},function(client){
	    		
	    		
	    		var query = "UPDATE Tables SET created = 1 WHERE name='reply_messages'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 382;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("reply_messages_created");
        			
        		});
    			
	    		
	    	});
			
			
			
		};
		
		
	var createMessageAttachmentsTable = function(client,mysql_con,fs){
			
			var attachment_size = 5 * 1024 * 1024; // 5MB
			
			query = "CREATE TABLE IF NOT EXISTS Message_Attachments(attachment_id INTEGER PRIMARY KEY AUTO_INCREMENT,message_id INTEGER REFERENCES Messages(message_id),reply_id INTEGER REFERENCES Reply_Messages(reply_id),attachment_type VARCHAR(20) NOT NULL,attachment VARCHAR("+attachment_size+") NOT NULL)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.log(error);
	    		var file_name = "startup_da_tables.js",
				line_number = 370;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("create_table_message_attachments_error");
	    		
	    	},function(client){
	    		
	    		
	    		var query = "UPDATE Tables SET created = 1 WHERE name='message_attachments'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 382;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("message_attachments_created");
        			
        		});
    			
	    		
	    	});
			
			
			
		};
		
		var createCatchaImagesTable = function(client,mysql_con,fs){
			
			
			query = "CREATE TABLE IF NOT EXISTS Catcha_Images(catcha_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,catcha_name VARCHAR(50) NOT NULL,catcha_value VARCHAR(50) NOT NULL,catcha_image VARCHAR(5000) NOT NULL)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.log(error);
	    		var file_name = "startup_da_tables.js",
				line_number = 370;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("create_table_catcha_images_error");
	    		
	    	},function(client){
	    		
	    		
	    		var query = "UPDATE Tables SET created = 1 WHERE name='catcha_images'";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 382;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        		},function(client){
        			
        			client.emit("catcha_images_created");
        			
        		});
    			
	    		
	    	});
			
			
			
		};
		
		
	
		var createTables = function(client,mysql_con,fs){
	
  
    			    createPhotographersTable(client,mysql_con,fs);
    			    createCityTable(client,mysql_con,fs);
    			    createAreasTable(client,mysql_con,fs);
    			    createPackagesTable(client,mysql_con,fs);
    			    createOrdersTable(client,mysql_con,fs);
    			    createUserIDsTable(client,mysql_con,fs);
    			    createUsersTable(client,mysql_con,fs);
    			    createAdminTable(client,mysql_con,fs);
    			    createAdminRightsTable(client,mysql_con,fs);
    			    createAlertsTable(client,mysql_con,fs);
    			    createDeliveryMethodTable(client,mysql_con,fs);
    			    createMessagesTable(client,mysql_con,fs);
    			    createReplyMessagesTable(client,mysql_con,fs);
    			    createMessageAttachmentsTable(client,mysql_con,fs);
    			    createCatchaImagesTable(client,mysql_con,fs);
    			    
    			    console.log("Tables created");	

};

var createTablesTable = function(client,mysql_con,fs){
	
		query = "CREATE TABLE Tables(name VARCHAR(50) PRIMARY KEY NOT NULL,created INTEGER,samples_added INTEGER,can_message INTEGER)";
    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
    		
    		console.trace(error);
    		var file_name = "startup_da_tables.js",
			line_number = 427;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			client.emit("create_table_tables_error");
    		
    	},function(client){
    		
    		var tables_name = new Array("photographers","packages","orders","areas","city","userids","users","alerts","admin","admin_rights","delivery_method","messages","reply_messages","message_attachments","catcha_images");
    		var tables_length = tables_name.length,
    		    added_tables = 0;
    		tables_name.forEach(function(table){
    			
    			var query = "INSERT INTO Tables(name,created,samples_added,can_message) VALUES('"+table+"',0,0,0)";
        		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
        			
        			console.log(error);
        			var file_name = "startup_da_tables.js",
    				line_number = 442;
    				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
    				
        			
        		},function(client){
        			
        			++added_tables;
        			
        		});
    			
    		});
    		
    		if(added_tables==tables_length){
    			client.emit("tables_table_created");
    		}
    		
    });
    	
};


var resetSystem = function(client,mysql_con,fs){
	
	var query = "DROP TABLE admin, admin_rights, alerts, areas, city, deliverymethod, orders, packages, photographers, tables, userids, users, messages,reply_messages,message_attachments,catcha_images";
	
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 472;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("system_reset_error");
		
	},function(client){
		
		client.emit("system_reset");
		
		});
	
	
};

var deletePhotographersTable = function(client,mysql_con,fs){
	
	
	var query = "DROP TABLE IF EXISTS Photographers";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 586;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_photographers_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 598;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='photographers'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 608;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_photographers_deleted");
				
			});
			
		});
		
	});
	
};

var deletePackagesTable = function(client,mysql_con,fs){
	
	
	var query = "DROP TABLE IF EXISTS Packages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 633;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_packages_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='packages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 645;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='packages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 655;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_packages_deleted");
				
			});
					
		});
		
	});
	
};

var deleteOrdersTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Orders";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 680;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_orders_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='orders'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 692;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='orders'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 702;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_orders_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAreasTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Areas";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 727;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_areas_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='areas'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 739;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='areas'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 749;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_areas_deleted");
				
			});
			
		});
		
	});
	
};

var deleteCityTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 774;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 786;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 797;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_city_deleted");
				
			});
			
		});
		
	});
	
};

var deleteDeliveryMethodTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS DeliveryMethod";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 822;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_delivery_method_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='delivery_method'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 834;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
	
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='delivery_method'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 844;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
		
				client.emit("table_delivery_method_deleted");
				
			});
			
		});
		
	});
	
};

var deleteUserIDsTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS UserIDs";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 869;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_userIDs_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='userIDs'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 881;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='userIDs'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 892;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_userIDs_deleted");
				
			});
			
			
		});
		
	});
	
};

var deleteUsersTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Users";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 921;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_users_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='users'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 930;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='users'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 940;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_users_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAdminTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Admin";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 965;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_admin_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='admin'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 977;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 987;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_admin_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAdminRightsTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Admin_Rights";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1012;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_admin_rights_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='admin_rights'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1024;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin_rights'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1034;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_admin_rights_deleted");
				
			});
			
		});
		
	});
	
};

var deleteAlertsTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Alerts";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_alerts_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='alerts'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='alerts'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_alerts_deleted");
				
			});
			
			
		});
		
	});
	
};


var deleteMessagesTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Messages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_messages_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='messages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='messages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_messages_deleted");
				
			});
			
			
		});
		
	});
	
};

var deleteReplyMessagesTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Reply_Messages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_alerts_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='reply_messages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='reply_messages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_reply_messages_deleted");
				
			});
			
			
		});
		
	});
	
};


var deleteMessageAttachmentsTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Message_Attachments";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_message_attachments_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='message_attachments'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='message_attachments'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_message_attachments_deleted");
				
			});
			
			
		});
		
	});
	
};

var deleteCatchaImagesTable = function(client,mysql_con,fs){
	
	var query = "DROP TABLE IF EXISTS Catcha_Images";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1059;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_table_catcha_images_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET created = 0 WHERE name='catcha_images'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1071;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='catcha_images'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "startup_da_tables.js",
				line_number = 1081;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				
			},function(client){
				
				client.emit("table_catcha_images_deleted");
				
			});
			
			
		});
		
	});
	
};



var emptyPhotographersTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Photographers";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1108;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_photographers_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='photographers'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1119;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_photographers_emptied");
			
		});
		
	});
	
};

var emptyPackagesTable = function(client,mysql_con,fs){
	
		var query = "TRUNCATE TABLE Packages";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1143;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_packages_error");
		
		
	},function(client){
		
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='packages'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1155;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_packages_emptied");
			
		});
		
	});
	
};

var emptyOrdersTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Orders";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1178;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_orders_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='orders'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1190;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_orders_emptied");
			
		});
		
	});
	
};

var emptyAreasTable = function(client,mysql_con,fs){
	
		var query = "TRUNCATE TABLE Areas";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1216;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_areas_error");
		
		
	},function(client){
		
			var query = "UPDATE Tables SET samples_added = 0 WHERE name='areas'";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1225;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_areas_emptied");
			
		});
		
	});
	
};

var emptyCityTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1248;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1260;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_city_emptied");
			
		});
		
	});
	
};

var emptyDeliveryMethodTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE DeliveryMethod";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1283;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_delivery_method_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='delivery_method'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1295;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_delivery_method_emptied");
			
		});
		
	});
	
};

var emptyUserIDsTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE UserIDs";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1318;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_userIDs_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='userIDs'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1330;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_userIDs_emptied");
			
		});
		
	});
	
};

var emptyUsersTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Users";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1353;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_users_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='users'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1365;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_users_emptied");
			
		});
		
	});
	
};

var emptyAdminTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Admin";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1388;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_admin_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1400;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_admin_emptied");
			
		});
		
	});
	
};

var emptyAdminRightsTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Admin_Rights";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1424;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_admin_rights_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='admin_rights'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1435;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_admin_rights_emptied");
			
		});
		
	});
	
};

var emptyAlertsTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Alerts";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1459;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_alerts_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='alerts'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1470;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_alerts_emptied");
			
		});
		
	});
	
};

var emptyCityTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE City";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_city_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='city'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_city_emptied");
			
		});
		
	});
	
};

var emptyMessagesTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Messages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_messages_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='messages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_messages_emptied");
			
		});
		
	});
	
};

var emptyReplyMessagesTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Reply_Messages";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_reply_messages_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='reply_messages'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_reply_messages_emptied");
			
		});
		
	});
	
};

var emptyMessageAttachmentsTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Message_Attachments";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_message_attachments_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='message_attachments'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_message_attachments_emptied");
			
		});
		
	});
	
};

var emptyCatchaImagesTable = function(client,mysql_con,fs){
	
	var query = "TRUNCATE TABLE Catcha_Images";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "startup_da_tables.js",
		line_number = 1493;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("empty_table_catcha_images_error");
		
		
	},function(client){
		
		var query = "UPDATE Tables SET samples_added = 0 WHERE name='catcha_images'";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			
			console.trace(error);
			var file_name = "startup_da_tables.js",
			line_number = 1505;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
		},function(client){
			
			client.emit("table_catcha_images_emptied");
			
		});
		
	});
	
};



var getTablesData = function(client,mysql_con,fs){
	
	var query = "SELECT * FROM Tables";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		//var file_name = "startup_da_tables.js",
		//line_number = 1529;
		//startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("get_tables_data_error");
	
		
	},function(client,rows,fields){
		
		var tablesData = [];
			
			rows.forEach(function(row){
				
				tablesData.push({
					"name" : row.name,
					"created" : parseInt(row.created),
					"samples_added" : parseInt(row.samples_added),
					"can_message" : row.can_message
						});
				
			});
			
			console.log(JSON.stringify(tablesData));
			client.emit("tables_data",JSON.stringify(tablesData));
	
	});
	
	
};

var resetMessagableState = function(client,mysql_con,fs,successCB){
	
	var query = "UPDATE Tables SET can_message = 0";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		var file_name = "startup_da_tables.js",
		line_number = 1839;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("reset_messagable_state_error");
	
	},function(client,rows,fields){
		
		successCB();
	
	});
	
	
};

var currentMessagableNames = function(client,mysql_con,fs){
	
	var query = "SELECT name FROM Tables WHERE can_message = 1";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		var file_name = "startup_da_tables.js",
		line_number = 1859;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("current_messagable_name_error");
	
	},function(client,rows,fields){
		
		console.log(rows);
		client.emit("current_messagable_names",JSON.stringify(rows));
	
	});
	
};


var markAsMessagable = function(client,mysql_con,fs,tableNames){
	
	
resetMessagableState(client,mysql_con,fs,function(){
		
 [].forEach.call(tableNames,function(table_name,i){
	
	var query = "UPDATE Tables SET can_message = 1 WHERE name = '"+table_name+"'";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		var file_name = "startup_da_tables.js",
		line_number = 1883;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("mark_as_messagable_error");
	
		
	},function(client,rows,fields){
		
		if(i==tableNames.length-1){
			
			getTablesData(client,mysql_con,fs);
		}
	
	});
	
  });
	
});
	
};


	exports.createTablesTable = createTablesTable;	
	exports.createTables = createTables;
	exports.resetSystem = resetSystem;
	exports.getTablesData = getTablesData;
	exports.markAsMessagable = markAsMessagable;
	exports.currentMessagableNames = currentMessagableNames;
	
	exports.createPhotographersTable = createPhotographersTable;
	exports.createPackagesTable = createPackagesTable;
	exports.createOrdersTable = createOrdersTable;
	exports.createAreasTable = createAreasTable;
	exports.createCityTable = createCityTable;
	exports.createDeliveryMethodTable = createDeliveryMethodTable;
	exports.createUserIDsTable = createUserIDsTable;
	exports.createUsersTable = createUsersTable;
	exports.createAdminTable = createAdminTable;
	exports.createAdminRightsTable = createAdminRightsTable;
	exports.createAlertsTable = createAlertsTable;
	exports.createMessagesTable = createMessagesTable;
	exports.createReplyMessagesTable = createReplyMessagesTable;
	exports.createMessageAttachmentsTable = createMessageAttachmentsTable;
	exports.createCatchaImagesTable = createCatchaImagesTable;
	
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
	exports.deleteMessagesTable = deleteMessagesTable;
	exports.deleteReplyMessagesTable = deleteReplyMessagesTable;
	exports.deleteMessageAttachmentsTable = deleteMessageAttachmentsTable;
	exports.deleteCatchaImagesTable = deleteCatchaImagesTable;
	
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
	exports.emptyMessagesTable = emptyMessagesTable;
	exports.emptyReplyMessagesTable = emptyReplyMessagesTable;
	exports.emptyMessageAttachmentsTable = emptyMessageAttachmentsTable;
	exports.emptyCatchaImagesTable = emptyCatchaImagesTable;
	
	exports.logSystemError = startup_da_parent.logSystemError;