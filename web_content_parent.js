var fs = require("fs");

var logFileSystemErrors = function(error,file_name,line_number){
	
	var system_error = {
			"error" : error,
			"file_name" : file_name,
			"line_number" : line_number
		};

	fs.appendFile('./js/data_access/log_files/file_system_errors.txt',JSON.stringify(system_error).concat('\n'),'utf8',function(err){
		if(err){
			console.trace(err);
			// if we can't read both files email the error to Admin for immediate attention.
			
		}
	});
	
	
};


var watchFileSystemLog = function(client){
	
	
	
	
	
};


exports.logFileSystemErrors = logFileSystemErrors;
exports.watchFileSystemLog = watchFileSystemLog;