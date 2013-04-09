var mysql = require('mysql');
var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

var addSampleData = function(client){
	
	
var addSamplePhotographers = function(client,mysql_con){
	
	try{
	
		query = "INSERT INTO photographers (f_name,l_name,username,password,email_address,physical_address,operating_area,service_code) VALUES('Kendrick','Lamar','Ken','12345','ken@gmail.com','Durban','Chatsworth',1)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client){
			
			query = "INSERT INTO photographers (f_name,l_name,username,password,email_address,physical_address,operating_area,service_code) VALUES('Joey','Badass','Joey','12345','joey@gmail.com','Empangeni','KwaDlangezwa',1)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	    		
	    		client.emit("sample_photographers_added");
	    		
	    	});
			
		});
    	
    	
	}catch(ex){
		
		console.trace(ex);
		
	}
		
};

var addSampleCities = function(client,mysql_con){
	
	try{
		var mysql_con = startup_da_parent.connection();
		mysql_con.connect();
		query = "INSERT INTO City(name) VALUES('Durban')";
		startup_da_parent.runQuery(query,mysql_con,client,function(){
			
			query = "INSERT INTO City(name) VALUES('Empangeni')";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(){
	    		
	    		client.emit("sample_cities_added");
	    	});
			
		});
    	
	}catch(ex){
		
		console.trace(ex);
		
	}
	
};

var addSampleAreas = function(client,mysql_con){
	
	try{
		query = "INSERT INTO Areas(city,location) VALUES('Empangeni','KwaDlangezwe')";
		startup_da_parent.runQuery(query,mysql_con,client,function(client){
			
			query = "INSERT INTO Areas(city,location) VALUES('Empangeni','Esikhawini')";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	    		
	    		query = "INSERT INTO Areas(city,location) VALUES('Durban','Umlazi')";
	        	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	        		
	        		query = "INSERT INTO Areas(city,location) VALUES('Durban','Durban Central')";
	            	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	            		
	            		query = "INSERT INTO Areas(city,location) VALUES('Durban','Durban Central')";
	                	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	                		
	                		query = "INSERT INTO Areas(city,location) VALUES('Durban','Isipingo')";
	                    	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	                    		
	                    		query = "INSERT INTO Areas(city,location) VALUES('Durban','Chatsworth')";
	                        	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	                        		
	                        		client.emit("sample_areas_added");
	                        		
	                        	});
	                    		
	                    	});
	                		
	                	});
	            		
	            	});
	        		
	        	});
	    		
	    	});
			
		});
    	
    	
    	
    	
	}catch(ex){
		
		console.trace(ex);
		
	}
	
	
	
	
};

var addSamplePackages = function(client,mysql_con){
	
	try{
		
		query = "INSERT INTO Packages(print_size,price) VALUES('16x16',16.00)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client){
			
			query = "INSERT INTO Packages(print_size,price) VALUES('24x24',24.00)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	    		
	    		query = "INSERT INTO Packages(print_size,price) VALUES('64x64',64.00)";
	        	startup_da_parent.runQuery(query,mysql_con,client,function(client){
	        		client.emit("sample_packages_added");
	        	});
	    		
	    		
	    	});
			
		});
    	
    	
	}catch(ex){
		
		console.trace(ex);
		
	}
	
	
	
	
};

var addSampleOrders = function(client,mysql_con){
	
	try{
		query = "INSERT INTO Orders (order_from,order_to,order_from_id,order_date,order_location,order_image_number,order_price) VALUES('Khulekani Ngongoma','Mrena Systems','122637783920','04-05-1012','Umlazi',1,16)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client){
			client.emit("sample_orders_added");
		});
    	
    	
	}catch(ex){
		
		console.trace(ex);
		
	}
	
	
	
};


	var addSampleUserIDs = function(client,mysql_con){
	
		try{
			query = "INSERT INTO UserIDs (user_id,userId_date_created,unique_hash_value) VALUES('04-05-2013','1s226d37ds783d9c20')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client){
				client.emit("sample_userIDs_added");
			
			});
			
    	
		}catch(ex){
		
			console.trace(ex);
		
		}
	
	};

	
	var mysql_con = startup_da_parent.connection();
	mysql_con.connect();

	addSamplePhotographers(client,mysql_con);
	addSampleCities(client,mysql_con);
	addSampleAreas(client,mysql_con);
	addSamplePackages(client,mysql_con);
	addSampleOrders(client,mysql_con);
	//mysql_con.end();
	
	

};
exports.addSampleData = addSampleData;