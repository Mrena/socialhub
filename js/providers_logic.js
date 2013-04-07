
var providers_da = require("./data_access/providers_da");

var providers = function(client,fs){
	
	client.on("get_printing_providers",function(){
		 
		 providers_da.getPrintingProviders(client);
		 
	 });
	
	client.on("submit_provider",function(provider){
		
		providers_da.submitPrintingProvider(client,provider);
		
	});
	
	
	
	
	
};

exports.providers = providers;