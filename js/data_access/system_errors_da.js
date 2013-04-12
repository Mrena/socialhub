	var fs = require("fs");


	var getDatabaseSystemErrors = function(client){
	
	
	fs.readFile(__dirname+"/log_files/database_system_errors.txt","utf8",function(error,content){
		
		if(error){
			
			console.trace(error);
			client.emit("get_database_log_error");
			
		}
		
		var objs = content.split('\n');
			
			
			client.emit("database_system_errors",objs);
	});
	
};


	var getFileSystemErrors = function(client){
	
		fs.readFile(__dirname+"/log_files/file_system_errors.txt","utf8",function(error,content){
			
			if(error){
				
				console.trace(error);
				client.emit("get_file_log_error");
				
			}
			
			var objs = content.split('\n');
				client.emit("file_system_errors",objs);
		});
	
	
	};

	var getSystemErrors = function(client){
	
		fs.readFile(__dirname+"/log_files/system_errors.txt","utf8",function(error,content){
			
			if(error){
				
				console.trace(error);
				client.emit("get_system_log_error");
				
			}
			
			var objs = content.split('\n');
			
				
				client.emit("system_errors",objs);
		});
	
	
	
	};


exports.getDatabaseSystemErrors = getDatabaseSystemErrors;
exports.getFileSystemErrors = getFileSystemErrors;
exports.getSystemErrors = getSystemErrors;