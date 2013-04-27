var fs = require("fs");
var startup_da_parent = require("./startup_da_parent");

var getPrintingProviders = function(client){
	
	client.on("get_printing_providers",function(){
		 
		 providers_da.getPrintingProviders(client);
		 
	 });
	
	
	
};


exports.printingProviders = printingProviders;
exports.logSystemError = startup_da_parent.logSystemError;