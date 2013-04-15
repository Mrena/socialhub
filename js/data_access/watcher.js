	var startup_da_parent = require(__dirname+"/startup_da_parent");
	var system_errors_da = require(__dirname+"/system_errors_da");


	var watcher = function(client,fs){
	
	
		
		var watchFileSystemLog = function(client){
			
			fs.watchFile(__dirname+"/log_files/file_system_errors.txt",function(curr,prev){
				
				system_errors_da.getFileSystemErrors(client);
			});
			
			console.log("watching file system error log");
			
			
			
			
		}(client);
		
		
		var watchDatabaseSystemLog = function(client){
			
			fs.watchFile(__dirname+"/log_files/database_system_errors.txt",function(curr,prev){
				
				system_errors_da.getDatabaseSystemErrors(client);
				
			});
			console.log("watching database system error log");
		}(client);
		
		
		var watchSystemLog = function(client){
			
			fs.watchFile(__dirname+"/log_files/system_errors.txt",function(curr,prev){
				system_errors_da.getSystemErrors(client);
				
			});
			
			console.log("watching system error log");
			
		}(client);
		
		
		var watchAllLogs = function(client){
			
			fs.watch(__dirname+"/log_files",function(event,filename){
				
				console.log(filename+" has been accessed");
			    switch(filename){
			    	case "database_system_errors.txt" :
			    		system_errors_da.getDatabaseSystemErrors(client);
			    		break;
			    	case "file_system_errors.txt" :
			    		system_errors_da.getFileSystemErrors(client);
			    		break;
			    	case "system_errors.txt" :
			    		system_errors_da.getSystemErrors(client);
			    		break;
			    	default:
			    		break;
			    
			    }
				
			});
			
		console.log("watching all log files");	
			
			
		}(client);
		
	
};


	exports.watcher = watcher;