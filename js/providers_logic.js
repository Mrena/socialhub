
		var providers_da = require("./data_access/providers_da");

var providers = function(client,fs){
	
	client.on("get_printing_providers",function(){
		 
		 	providers_da.getPrintingProviders(client);
		 
	 });
	
	client.on("submit_provider",function(provider){
		
			providers_da.submitPrintingProvider(client,provider);
		
	});
	
	client.on("filter_service_providers",function(filter_obj){
		
		filter_obj = JSON.parse(filter_obj);
		var filter_category = filter_obj.filter_category,
			filter_value = filter_obj.filter_value;
			providers_da.filterServiceProviders(client,filter_category,filter_value);
		
	});
	
	client.on("delete_service_provider",function(username){
		
			providers_da.deleteServiceProvider(client,username);
		
	});
	
	client.on("update_service_provider",function(objProvider){
			
			objProvider = JSON.parse(objProvider);
			providers_da.updateServiceProvider(client,objProvider);
		
	});
	
	client.on("get_all_operating_areas",function(){
		
			providers_da.getAllOperatingAreas(client);
		
	});
	
	client.on("is_provider_username_taken",function(username){
		
		providers_da.isProviderUsernameTaken(client,username);
		
	});
	
	client.on("validate_service_provider",function(objProvider){
			
		objProvider = JSON.parse(objProvider);
		providers_da.validateProvider(client,objProvider.username,objProvider.password);
		
	});
	
	
	
	
	
	
	
};

exports.providers = providers;