
var providers_da = require("./data_access/providers_da");
var system_alerts_da = require("./data_access/system_alerts_da");

var providers = function(client,mysql_con,fs){
	
	client.on("get_printing_providers",function(){
		     
		    try{
		    	
		 	providers_da.getPrintingProviders(client,mysql_con,fs);
		 	
		    }catch(error){
				console.log(error);
				var file_name = "providers_logic.js",
				line_number = 10;
				providers_da.logSystemError(client,error,file_name,line_number);
			}
			
		 
	 });
	
	client.on("submit_provider",function(provider){
		
		try{
		
			providers_da.submitPrintingProvider(client,mysql_con,fs,provider);
			system_alerts_da.sendProviderSignUpAlert(client,mysql_con);
			
		}catch(error){
			
			console.log(error);
			var file_name = "providers_logic.js",
			line_number = 26;
			providers_da.logSystemError(client,error,file_name,line_number);
		}
		
		
	});
	
	client.on("filter_service_providers",function(filter_obj){
		
		try{
		
		filter_obj = JSON.parse(filter_obj);
		var filter_category = filter_obj.filter_category,
			filter_value = filter_obj.filter_value;
			providers_da.filterServiceProviders(client,mysql_con,fs,filter_category,filter_value);
			
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 46;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("delete_service_provider",function(username){
		
		
	try{
		
			providers_da.deleteServiceProvider(client,mysql_con,fs,username);
			
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 63;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("update_service_provider",function(objProvider){
			
		
	try{
		
			objProvider = JSON.parse(objProvider);
			providers_da.updateServiceProvider(client,mysql_con,fs,objProvider);
			
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 78;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("get_all_operating_areas",function(){
		
		
		try{
			
			providers_da.getAllOperatingAreas(client,mysql_con,fs);
			
		}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 98;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("is_provider_username_taken",function(username){
		
		
	try{
		
		providers_da.isProviderUsernameTaken(client,mysql_con,fs,username);
		
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 122;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("validate_service_provider",function(objProvider){
		
		try{
		
			objProvider = JSON.parse(objProvider);
			providers_da.validateProvider(client,mysql_con,fs,objProvider.username,objProvider.password);
		
		}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 132;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("get_service_provider_edit_info",function(username){
		
	try{
		
		// we have to store the username on the server side rather than getting it from the client side
		// because if a user we to change the sessionStorage to another provider's username
		// they will have access to that provider's account
		
		//client.get("username",function(username){
			providers_da.getProviderEditableInfo(client,mysql_con,fs,username);
			
		//});
			
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 150;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
	client.on("submit_edit_provider",function(objProvider){
		
	try{
		
		objProvider = JSON.parse(objProvider);
		providers_da.updateProviderInfo(client,mysql_con,fs,objProvider); 
		
	}catch(error){
		
		console.log(error);
		var file_name = "providers_logic.js",
		line_number = 172;
		providers_da.logSystemError(client,error,file_name,line_number);
	}
		
	});
	
};

exports.providers = providers;