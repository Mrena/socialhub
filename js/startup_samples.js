var startup_da_samples = require("./data_access/startup_da_samples");


var startup_samples = function(client,mysql_con,fs){
	
	
	client.on("add_sample_photographers",function(){
		try{
		
			startup_da_samples.addOnlySamplePhotographers(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 10;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
		
	});
	
	
	client.on("add_sample_packages",function(){
		
		try{
			
			startup_da_samples.addOnlySamplePackages(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 28;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_orders",function(){
		
		try{
			
			startup_da_samples.addOnlySampleOrders(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 44;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_areas",function(){
		
		try{
			
			startup_da_samples.addOnlySampleAreas(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 60;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_cities",function(){
		
		try{
			
			startup_da_samples.addOnlySampleCities(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 76;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_userIDs",function(){
		
		try{
			
			startup_da_samples.addOnlySampleUserIDs(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 92;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_users",function(){
		
		try{
			
			startup_da_samples.addOnlySampleUsers(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 108;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_admin",function(){
		
		try{
			
			startup_da_samples.addOnlySampleAdmin(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 124;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_admin_rights",function(){
		
		
		try{
			
			startup_da_samples.addOnlySampleAdminRights(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 141;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("add_sample_alerts",function(){
		
		try{
			
			startup_da_samples.addOnlySampleAlerts(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_samples.js",
			line_number = 157;
			startup_da_samples.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("create_database",function(database_name){
		  
	try{
		
		  startup_da_samples.createDatabase(database_name,client,mysql_con);
		  
	}catch(error){
		console.log(error);
		var file_name = "startup_samples.js",
		line_number = 173;
		startup_da_samples.logSystemError(error,file_name,line_number);
	}
		  
 });
	
 client.on("add_sample_data",function(){
		 
	 try{
		 
		 startup_da_samples.addSampleData(client,mysql_con);
		 
 	}catch(error){
		console.log(error);
		var file_name = "startup_samples.js",
		line_number = 188;
		startup_da_samples.logSystemError(error,file_name,line_number);
	}
		 
 });
 
 client.on("add_sample_delivery_method",function(){
	 
	 try{
		 
		 startup_da_samples.addOnlySampleDeliveryMethod(client,mysql_con);
		 
 	}catch(error){
		console.log(error);
		var file_name = "startup_samples.js",
		line_number = 201;
		startup_da_samples.logSystemError(error,file_name,line_number);
	}
		 
 });
	
};


exports.startup_samples = startup_samples;