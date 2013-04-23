	var startup_da_parent = require(__dirname+"/startup_da_parent");
	var system_errors_da = require(__dirname+"/system_errors_da");


	var watcher = function(client,mysql_con,fs){
	
		var watchAllLogs = function(client){
			
			fs.watch(__dirname+"/log_files",function(event,filename){
				
				console.log(filename+" has been accessed");
			    switch(filename){
			    	case "database_system_errors.json" :
			    		system_errors_da.getDatabaseSystemErrors(client);
			    		break;
			    	case "file_system_errors.json" :
			    		system_errors_da.getFileSystemErrors(client);
			    		break;
			    	case "system_errors.json" :
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