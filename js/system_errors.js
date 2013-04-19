var system_errors_da = require("./data_access/system_errors_da");

var system_errors = function(client,fs){
	
	
	client.on("get_system_errors",function(){
		
		
		try{
		
		system_errors_da.getSystemErrors(client);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 11;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	client.on("get_database_system_errors",function(){
		
		try{
			
		console.log("in get database system errors");
		system_errors_da.getDatabaseSystemErrors(client);
		
		}catch(error){
			
			console.log(error);
			var file_name = "system_errors.js",
			line_number = 28;
			system_errors_da.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("get_file_system_errors",function(){
		
	try{
		
		system_errors_da.getFileSystemErrors(client);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 44;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	client.on("delete_system_error",function(objError){
		
	try{
		
		objError = JSON.parse(objError);
		system_errors_da.deleteSystemError(client,objError);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 61;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
		
	});
	
	client.on("delete_file_system_error",function(objError){
		
	try{
		
		objError = JSON.parse(objError);
		system_errors_da.deleteFileSystemError(client,objError);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 79;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	client.on("delete_database_system_error",function(objError){
		
	try{
		
		objError = JSON.parse(objError);
		system_errors_da.deleteDatabaseSystemError(client,objError);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 96;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	
	client.on("log_system_error",function(objError){
		
		try{
		
		objError = JSON.parse(objError);
		console.log(objError);
		var error = {
				code : objError.error
		};
		var file_name = objError.file_name,
			line_number = objError.line_number;
		
		system_errors_da.logSystemError(error,file_name,line_number);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 109;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
		
	});
	
	
	client.on("filter_database_errors",function(objFilter){
		
	try{
		
		objFilter = JSON.parse(objFilter);
		system_errors_da.filterDatabaseErrors(client,objFilter.filter_category,objFilter.filter_value);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 135;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	
	client.on("filter_file_errors",function(objFilter){
		
	try{
		
		objFilter = JSON.parse(objFilter);
		system_errors_da.filterFileErrors(client,objFilter.filter_category,objFilter.filter_value);
		
	}catch(error){
		
		console.log(error);
		var file_name = "system_errors.js",
		line_number = 153;
		system_errors_da.logSystemError(error,file_name,line_number);
	}
		
	});
	
	client.on("filter_system_errors",function(objFilter){
		
		try{
		
		objFilter = JSON.parse(objFilter);
		system_errors_da.filterSystemErrors(client,objFilter.filter_category,objFilter.filter_value);
		
		}catch(error){
			
			console.log(error);
			var file_name = "system_errors.js",
			line_number = 170;
			system_errors_da.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_all_file_system_errors",function(){
		
		try{
			
			system_errors_da.deleteAllFileSystemErrors(client);
			
			}catch(error){
				
				console.log(error);
				var file_name = "system_errors.js",
				line_number = 191;
				system_errors_da.logSystemError(error,file_name,line_number);
			}
			
	});
	
	client.on("delete_all_database_system_errors",function(){
		
		try{
			
			system_errors_da.deleteAllDatabaseSystemErrors(client);
			
			}catch(error){
				
				console.log(error);
				var file_name = "system_errors.js",
				line_number = 207;
				system_errors_da.logSystemError(error,file_name,line_number);
			}
			
	});
	
	client.on("delete_all_system_errors",function(){
		
		try{
			
			system_errors_da.deleteAllSystemErrors(client);
			
			}catch(error){
				
				console.log(error);
				var file_name = "system_errors.js",
				line_number = 223;
				system_errors_da.logSystemError(error,file_name,line_number);
			}
			
	});
	
	
};



exports.system_errors = system_errors;