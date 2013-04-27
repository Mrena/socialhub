	var fs = require("fs");
	var startup_da_parent = require(__dirname+"/startup_da_parent");


var getDatabaseSystemErrors = function(client,new_error){
	
	try{
		
	fs.readFile(__dirname+"/log_files/database_system_errors.json","utf8",function(error,content){
		
		if(error){
			console.trace(error);
			var file_name = "system_errors_da.js",
			line_number = 8;
			startup_da_parent.logFileSystemError(client,error,file_name,line_number);
			client.emit("get_database_log_error");
			
			
		}else{
		
		var objs = content.split('\n');
		    
		if(new_error)
			client.broadcast.emit("database_system_errors",objs);
		    else
		    	client.emit("database_system_errors",objs);
		}
	});
	

	}catch(error){
		console.log(error);
		var file_name = "system_errors_da.js",
		line_number = 5;
		startup_da_parent.logSystemError(client,error,file_name,line_number);
	}
	
};


	var getFileSystemErrors = function(client,new_error){
	
		try{
			
		fs.readFile(__dirname+"/log_files/file_system_errors.json","utf8",function(error,content){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 28;
				startup_da_parent.logFileSystemError(error,file_name,line_number);
				client.emit("get_file_log_error");
				
			}else{
			
			var objs = content.split('\n');
			
			if(new_error)
				client.broadcast.emit("file_system_errors",objs);
				else
					client.emit("file_system_errors",objs);
			}
		});
	
	
	}catch(error){
		console.log(error);
		var file_name = "system_errors_da.js",
		line_number = 36;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
		
		
	};

	var getSystemErrors = function(client,new_error){
	
		try{
			
		fs.readFile(__dirname+"/log_files/system_errors.json","utf8",function(error,content){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 48;
				startup_da_parent.logFileSystemError(error,file_name,line_number);
				client.emit("get_system_log_error");
				
			}else{
			
			var objs = content.split('\n');
			
			  if(new_error)
				  client.broadcast.emit("system_errors",objs);
			  	else
			  		client.emit("system_errors",objs);
			}
		});
	
	}catch(error){
		console.log(error);
		var file_name = "system_errors_da.js",
		line_number = 68;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
	
	};
	
	var deleteSystemError = function(client,objError){
		
		try{
		
		fs.readFile(__dirname+"/log_files/system_errors.json","utf8",function(error,content){
			
			if(error){
				
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 69;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				client.emit("get_system_log_error");
				
			}else{
			
				var objs = content.split('\n');
				console.log(objs.length);
				console.log(objs[0]);
				
				for(var i = 0, len = objs.length;i<len;i++){
					
					if(objs[i]!=''){
						objs[i] = JSON.parse(objs[i]);
						if(objs[i].error.code==objError.error_code && objs[i].error.errno == objError.error_number && objs[i].error.syscall==objError.error_syscall && objs[i].error.fatal == objError.error_fatal && objs[i].file_name == objError.error_file_name && objs[i].line_number == objError.error_line_number){
									delete objs[i];
						
					}
					
				}
					
			}
					
					// turn the array back into a newline separated string
					var errorString = "";
					for(var i = 0, len = objs.length;i<len;i++){
						if(objs[i]){
							
						objs[i] = JSON.stringify(objs[i]);
						errorString += objs[i].concat("\n");
							
					}
						
				}
					
					
		fs.writeFile(__dirname+"/log_files/system_errors.json",JSON.stringify(objs),"utf8",function(error){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 92;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				client.emit("delete_system_log_error");
				
				}
			
			getSystemErrors(client,true);
			
		});
		
		}
				
	});
		
		
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "system_errors_da.js",
		line_number = 98;
		startup_da_parent.logSystemError(error,file_name,line_number);
	}
	
		
};
	
	var deleteFileSystemError = function(client,objError){
		
		try{
		fs.readFile(__dirname+"/log_files/file_system_errors.json","utf8",function(error,content){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 113;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				client.emit("delete_file_system_log_error");
				
			}else{
			
				var objs = content.split('\n');
					console.log(objs.length);
					console.log(objs[0]);
					
					for(var i = 0, len = objs.length;i<len;i++){
						
						if(objs[i]!=''){
							objs[i] = JSON.parse(objs[i]);
							if(objs[i].error.code==objError.error_code && objs[i].error.errno == objError.error_number && objs[i].error.path == objError.error_path && objs[i].file_name == objError.error_file_name && objs[i].line_number == objError.error_line_number){
										delete objs[i];
							
						}
						
					}
						
				}
						
						// turn the array back into a newline separated string
						var errorString = "";
						for(var i = 0, len = objs.length;i<len;i++){
							if(objs[i]){
								
							objs[i] = JSON.stringify(objs[i]);
							errorString += objs[i].concat("\n");
								
						}
							
					}
								
					
					
	fs.writeFile(__dirname+"/log_files/file_system_errors.json",errorString,"utf8",function(error){
			
			if(error){
				console.trace(error);
				client.emit("delete_file_system_log_error");
				var file_name = "system_errors_da.js",
				line_number = 139;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
			}
			
			getFileSystemErrors(client,true);
			
		});		
		
	  }
			
	});
		
	
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "system_errors_da.js",
			line_number = 175;
			startup_da_parent.logSystemError(error,file_name,line_number);
		}
		
	};
	
	var deleteDatabaseSystemError = function(client,objError){
		
		try{
		
		fs.readFile(__dirname+"/log_files/database_system_errors.json","utf8",function(error,content){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 157;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				client.emit("delete_database_system_log_error");
				
			}else{
			
				var objs = content.split('\n');
				console.log(objs.length);
				console.log(objs[0]);
				
				for(var i = 0, len = objs.length;i<len;i++){
					
					if(objs[i]!=''){
						objs[i] = JSON.parse(objs[i]);
						
					if(objs[i].error.errno != undefined && objs[i].error.syscall != undefined  && objs[i].error.fatal != undefined){
						
					
						console.log("Contains fatal and syscall");
						console.log(objs[i].error.code.toString().trim()==objError.error_code.toString().trim());
						console.log(objs[i].error.code+" "+objError.error_code);
						console.log(objs[i].error.errno +" "+ objError.error_number);
						console.log(objs[i].file_name +" "+ objError.error_file_name);
						console.log(objs[i].line_number +" "+ objError.error_line_number);
						console.log("--------------------------------------------------------------");
						if(objs[i].error.code == objError.error_code && objs[i].error.errno == objError.error_number && objs[i].error.syscall == objError.error_syscall && objs[i].error.fatal == objError.error_fatal && objs[i].file_name == objError.error_file_name && objs[i].line_number == objError.error_line_number){
									delete objs[i];
						
					}
						
				  }else{
					  
					    console.log("Does not contains fatal and syscall");
					    console.log(objs[i].error.errno);
						console.log(objs[i].error.code.toString().trim()==objError.error_code.toString().trim());
						console.log(objs[i].error.code+" "+objError.error_code);
						console.log(objs[i].error.errno +" "+ objError.error_number);
						console.log(objs[i].file_name +" "+ objError.error_file_name);
						console.log(objs[i].line_number +" "+ objError.error_line_number);
						console.log("--------------------------------------------------------------");
						if(objs[i].error.code == objError.error_code && objs[i].error.errno == objError.error_number && objs[i].file_name == objError.error_file_name && objs[i].line_number == objError.error_line_number){
									delete objs[i];
					  
				   }
					
				}
					
			}
				
		}
	
					// turn the array back into a newline separated string
					var errorString = "";
					for(var i = 0, len = objs.length;i<len;i++){
						if(objs[i]){
						objs[i] = JSON.stringify(objs[i]);
						errorString += objs[i].concat("\n");
							
					}
						
				}
					
					
		fs.writeFile(__dirname+"/log_files/database_system_errors.json",errorString,"utf8",function(error){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 179;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				client.emit("delete_database_system_log_error");
			}
			
			getDatabaseSystemErrors(client,true);
			
		  });	
		
		}
				
	});
		
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "system_errors_da.js",
			line_number = 149;
			startup_da_parent.logSystemError(client,error,file_name,line_number);
		}	
		
};

	var filterDatabaseErrors = function(client,filter_category,filter_value){
		
		try{
		
	  var filteredErrors = "";
	  
	  fs.readFile(__dirname+"/log_files/database_system_errors.json","utf8",function(error,content){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 113;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				
			}else{
			
				var objs = content.split('\n');
					console.log(objs.length);
					console.log(objs[0]);
					
					for(var i = 0, len = objs.length;i<len;i++){
						
						if(objs[i]!=''){
							objs[i] = JSON.parse(objs[i]);
							if(filter_category != "file_name" && filter_category != "line_number"){
								   
									console.log(objs[i].error[filter_category]);
								   
								   if(objs[i].error[filter_category].toString().indexOf(filter_value) != -1){
									    objs[i] = JSON.stringify(objs[i]);
									    filteredErrors += objs[i].concat("\n");
									    console.log("FilteredErrors "+filteredErrors);
									
								   }
									    
							}else{
								
								console.log(objs[i][filter_category]);
								
								if(objs[i][filter_category].toString().indexOf(filter_value) != -1){
									objs[i] = JSON.stringify(objs[i]);
									filteredErrors += objs[i].concat("\n");
									console.log("FilteredErrors "+filteredErrors);
								}
						   }
					  }
						
				 }
					
			}
			
		});
	  
	  
	  	  console.log("about to emit "+filteredErrors+" value___________________________________");
	     if(filteredErrors!=""){
	    	 console.log("about to emit "+filteredErrors);
	    	  client.emit("database_system_errors",JSON.stringify(filteredErrors));
	      }
	     
	     
	     
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "system_errors_da.js",
			line_number = 349;
			startup_da_parent.logSystemError(client,error,file_name,line_number);
		} 
	     
	     
	};

	var filterFileErrors = function(client,filter_category,filter_value){
		
		try{
		
		 var filteredErrors = "";
		 
			fs.readFile(__dirname+"/log_files/file_system_errors.json","utf8",function(error,content){
				
				if(error){
					console.trace(error);
					var file_name = "system_errors_da.js",
					line_number = 113;
					startup_da_parent.logFileSystemError(client,error,file_name,line_number);
					
					
				}else{
				
					var objs = content.split('\n');
						console.log(objs.length);
						console.log(objs[0]);
						
						for(var i = 0, len = objs.length;i<len;i++){
							
							if(objs[i]!=''){
								objs[i] = JSON.parse(objs[i]);
								if(filter_category != "file_name" && filter_category != "line_number"){
									   
										console.log(objs[i].error[filter_category]);
									   
									   if(objs[i].error[filter_category].toString().indexOf(filter_value) != -1){
										    objs[i] = JSON.stringify(objs[i]);
										    filteredErrors += objs[i].concat("\n");
										    console.log("FilteredErrors "+filteredErrors);
										
									   }
										    
								}else{
									
									console.log(objs[i][filter_category]);
									
									if(objs[i][filter_category].toString().indexOf(filter_value) != -1){
										objs[i] = JSON.stringify(objs[i]);
										filteredErrors += objs[i].concat("\n");
										console.log("FilteredErrors "+filteredErrors);
									}
							   }
						  }
							
					 }
						
				}
				
			});
			
			console.log("about to emit "+filteredErrors+" value___________________________________");
			if(filteredErrors!=""){
				console.log("about to emit "+filteredErrors);
				client.emit("file_system_errors",JSON.stringify(filteredErrors));
				
			}
			
			
		}catch(error){
			// System error logging
			console.log(error);
			var file_name = "system_errors_da.js",
			line_number = 422;
			startup_da_parent.logSystemError(client,error,file_name,line_number);
		}
			
			
	};

	var filterSystemErrors = function(client,filter_category,filter_value){
		
		 var filteredErrors = "";
		 
		 fs.readFile(__dirname+"/log_files/system_errors.json","utf8",function(error,content){
				
				if(error){
					console.trace(error);
					var file_name = "system_errors_da.js",
					line_number = 113;
					startup_da_parent.logFileSystemError(client,error,file_name,line_number);
					
				}else{
				
					var objs = content.split('\n');
						console.log(objs.length);
						console.log(objs[0]);
						
						for(var i = 0, len = objs.length;i<len;i++){
							
							if(objs[i]!=''){
								objs[i] = JSON.parse(objs[i]);
								if(filter_category != "file_name" && filter_category != "line_number"){
									   
										console.log(objs[i].error[filter_category]);
									   
									   if(objs[i].error[filter_category].toString().indexOf(filter_value) != -1){
										    objs[i] = JSON.stringify(objs[i]);
										    filteredErrors += objs[i].concat("\n");
										    console.log("FilteredErrors "+filteredErrors);
										
									   }
										    
								}else{
									
									console.log(objs[i][filter_category]);
									
									if(objs[i][filter_category].toString().indexOf(filter_value) != -1){
										objs[i] = JSON.stringify(objs[i]);
										filteredErrors += objs[i].concat("\n");
										console.log("FilteredErrors "+filteredErrors);
									}
							   }
						  }
							
					 }
						
				}
				
			});
		 
		 console.log("about to emit "+filteredErrors+" value___________________________________");
		if(filteredErrors!=""){
			console.log("about to emit "+filteredErrors);
		client.emit("system_errors",JSON.stringify(filteredErrors));
		}
		
		
	};
	
	var deleteAllFileSystemErrors = function(client){
		
		fs.open(__dirname+"/log_files/file_system_errors.json",'w+',function(error,fd){
			
			if(error){
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 557;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				
			}else{
				
					getFileSystemErrors(client,true);
					fs.close(fd);
			}
			
		});
		
	};
	
	var deleteAllDatabaseSystemErrors = function(client){
		
		fs.open(__dirname+"/log_files/database_system_errors.json",'w+',function(error,fd){
			
			if(error){
				
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 578;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				
			}else{
				
					getDatabaseSystemErrors(client,true);
					fs.close(fd);
			}
			
		});
		
		
	};
	
	var deleteAllSystemErrors = function(client){
		
		
		fs.open(__dirname+"/log_files/system_errors.json",'w+',function(error,fd){
			
			if(error){
				
				console.trace(error);
				var file_name = "system_errors_da.js",
				line_number = 603;
				startup_da_parent.logFileSystemError(client,error,file_name,line_number);
				
			}else{
				
					getFileSystemErrors(client,true);
					fs.close(fd);
			}
			
		});
		
	};
	
	
	exports.getDatabaseSystemErrors = getDatabaseSystemErrors;
	exports.getFileSystemErrors = getFileSystemErrors;
	exports.getSystemErrors = getSystemErrors;
	exports.deleteSystemError = deleteSystemError;
	exports.deleteFileSystemError = deleteFileSystemError;
	exports.deleteDatabaseSystemError = deleteDatabaseSystemError;
	exports.logSystemError = startup_da_parent.logSystemError;
	exports.filterDatabaseErrors = filterDatabaseErrors;
	exports.filterFileErrors = filterFileErrors;
	exports.filterSystemErrors = filterSystemErrors;
	exports.deleteAllSystemErrors = deleteAllSystemErrors;
	exports.deleteAllFileSystemErrors = deleteAllFileSystemErrors;
	exports.deleteAllDatabaseSystemErrors = deleteAllDatabaseSystemErrors;
	