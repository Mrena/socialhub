
var providers_da = require("./data_access/providers_da");

var providers = function(client,fs){
	
	client.on("get_printing_providers",function(){
		 
		 providers_da.getPrintingProviders(client);
		 
	 });
	
	client.on("submit_provider",function(provider){
		
		providers_da.submitPrintingProvider(client,provider);
		
	});
	
	client.on("filter_service_providers",function(filter_obj){
		
		providers_da.filterServiceProviders(client,filter_obj);
	});
	
	
	
	
	
};

exports.providers = providers;