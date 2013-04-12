var system_errors_da = require("./data_access/system_errors_da");

var system_errors = function(client,fs){
	
	
	client.on("get_system_errors",function(){
		
		system_errors_da.getSystemErrors(client);
		
	});
	
	client.on("get_database_system_errors",function(){
		console.log("in get database system errors");
		system_errors_da.getDatabaseSystemErrors(client);
		
	});
	
	client.on("get_file_system_errors",function(){
		
		system_errors_da.getFileSystemErrors(client);
		
	});
	
};



exports.system_errors = system_errors;