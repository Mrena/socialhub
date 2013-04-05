var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");


var createTables = function(client){
	
	
    	
    
    var createPhotographersTable = function(mysql_con,client){
    	
    	try{
    		
    		var query = "CREATE TABLE Photographers(f_name VARCHAR(50),l_name VARCHAR(50),username VARCHAR(50) PRIMARY KEY NOT NULL,password VARCHAR(50) NOT NULL,email_address VARCHAR(50) NOT NULL,physical_address VARCHAR(50),operating_area VARCHAR(100) NOT NULL,service_code BINARY)";
    		startup_da_parent.runQuery(query,mysql_con);
    		
    		client.emit("photographers_created");
    		
    		
    	}catch(ex){
    		console.trace("Error: "+ex);
    	
    	}
    	
    	
    	
    	
    };
    
    
    var createCityTable = function(mysql_con,client){
    	try{
    		query = "CREATE TABLE City(city_id INTEGER PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50))";
    		startup_da_parent.runQuery(query,mysql_con);
    		
    		client.emit("city_created");
    			
    		}catch(ex){
    			if(ex)
    				console.trace(ex);
    			return;
    		}
    		
    		

    	};
    	
    	
    	var createAreasTable = function(mysql_con,client){
    		try{
    			query = "CREATE TABLE Areas(area_id INTEGER PRIMARY KEY AUTO_INCREMENT,city VARCHAR(50) REFERENCES City(name),location VARCHAR(100))";
    			startup_da_parent.runQuery(query,mysql_con);	
    			
    			client.emit("areas_created");
    				
    			}catch(ex){
    					if(ex)
    						console.trace("Error: "+ex);
    				
    			}
    			
    			
    			
    			
    		};

    		
    		
    		var createPackagesTable = function(mysql_con,client){
    			try{
    				query = "CREATE TABLE Packages(package_id INTEGER PRIMARY KEY AUTO_INCREMENT,print_size VARCHAR(50),price DECIMAL)";
    				startup_da_parent.runQuery(query,mysql_con);
    				
    				client.emit("packages_created");
    					
    				}catch(ex){
    					if(ex)
    						console.trace(ex);
    					return;
    				}
    				
    				
    				

    			};
    			
    			
    			var createOrdersTable = function(mysql_con,client){
    				try{
    					query = "CREATE TABLE Orders(order_id INTEGER PRIMARY KEY AUTO_INCREMENT,order_from VARCHAR(50) NOT NULL,order_from_id VARCHAR(1000) NOT NULL,order_to VARCHAR(50) NOT NULL,order_date VARCHAR(10) NOT NULL,order_location VARCHAR(50) NOT NULL,order_image_number INTEGER NOT NULL,order_price DECIMAL NOT NUll,order_fullfilled BINARY,order_fullfilled_date VARCHAR(10),order_comments VARCHAR(50))";
    					startup_da_parent.runQuery(query,mysql_con);
    					client.emit("orders_created");
    						
    					}catch(ex){
    						if(ex)
    							console.trace("Error: "+ex);
    						return;
    					}
    					
    					
    					
    					
    				};

    				
    				var createUserIDsTable = function(mysql_con,client){
    					
    					try{
    						
    						query = "CREATE TABLE UserIDs(user_id INTEGER PRIMARY KEY AUTO_INCREMENT,userId_date_created VARCHAR(50),hash_value VARCHAR(50)";
    				    	startup_da_parent.runQuery(query,mysql_con);
    				    	client.emit("userIDs_created");
    						
    					}catch(ex){
    						if(ex)
    							console.trace(ex);
    						return;
    					}
    					
    				};
    				
    				var mysql_con = startup_da_parent.connection();
    			    mysql_con.connect();
    			    createPhotographersTable(mysql_con,client);
    			    createCityTable(mysql_con,client);
    			    createAreasTable(mysql_con,client);
    			    createPackagesTable(mysql_con,client);
    			    createOrdersTable(mysql_con,client);
    			    //createUserIDsTable(mysql_con,client);
    			    
    			    console.log("Tables created");
    			    mysql_con.end();	

};

exports.createTables = createTables;