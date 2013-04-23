var web_content_parent = require("./web_content_parent");

var web_content = function(client,mysql_con,fs){
	
  client.on("get_provider_deliveries_page",function(){
		
		try{
		
		fs.readFile("./web_content/provider_deliveries.html",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 9;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
				
			}else{
			
			client.emit("provider_deliveries_page",content);
			
			}
			
		});
		
		
	}catch(error){
		
		console.log(error);
		var file_name = "web_content.js",
		line_number = 5;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
		
		
	});
	
	client.on("get_provider_statistics_page",function(){
		
		try{
		
		fs.readFile("./web_content/provider_statistics.html",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 44;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
				
			}else{
			
			client.emit("provider_statistics_page",content);
			
			}
			
		});
		
		
	}catch(error){
		
		console.log(error);
		var file_name = "web_content.js",
		line_number = 40;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
		
	});
	
	client.on("get_provider_services_page",function(){
		
	 try{
		
		fs.readFile("./web_content/add_provider_services.html",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 78;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
			
			client.emit("provider_sevices_page",content);
			
			}
			
		});
		
	}catch(error){
		
		console.log(error);
		var file_name = "web_content.js",
		line_number = 74;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
		
		
	});
	
	client.on("get_edit_provider_info_page",function(){
		
	 try{
		
		fs.readFile("./web_content/edit_provider_info.html",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 111;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
			
			client.emit("edit_provider_info_page",content);
			
			}
			
		});
		
	}catch(error){
		
		console.log(error);
		var file_name = "web_content.js",
		line_number = 107;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
		
	});
	
	
client.on("get_system_errors_page",function(){
		
	try{
	
		fs.readFile("./web_content/system_errors.html",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 144;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
				
			}else{
			
			client.emit("system_errors_page",content);
			
			}
			
		});
		
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 140;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
		
		
});


client.on("get_end_users_page",function(){
	
	try{
	
	fs.readFile("./web_content/end_users.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 179;
			web_content_parent.logFileSystemError(error,file_name,line_number);
			
		}else{
		
		client.emit("end_users_page",content);
		
		}
		
	});
	
	
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 175;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
	
	
 });


client.on("get_service_provider_page",function(){
	
	try{
	
	fs.readFile("./provider.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 214;
			web_content_parent.logFileSystemError(error,file_name,line_number);
			
		}else{
		
		client.emit("service_provider_page",content);
		
		}
		
	});
	
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 210;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
	
	
});


client.on("redirect_home",function(){
	
	try{
	
	fs.readFile("./game.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			var file_name = "web_content.js",
				line_number = 248;
				web_content_parent.logFileSystemError(error,file_name,line_number);
			
			
			
		}else{
		
		client.emit("redirected_home",content);
		
		}
		
	});
	
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 244;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
	
	
});


client.on("get_about",function(){
	
	try{
	
	 fs.readFile("./web_content/about.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 168;
			web_content_parent.logFileSystemError(error,file_name,line_number);
			
		}else{
		
		client.emit("about",content);
		
		}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 279;
		web_content_parent.logSystemError(error,file_name,line_number);
}
	 
	 
});

client.on("get_contact",function(){
	
	try{
	
	 fs.readFile("./web_content/contact.html",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 316;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("contact",content);
		
			}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 312;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
	 
	 
});


client.on("get_database_content",function(){
	
	try{
	
	 fs.readFile("./web_content/startup_database.html",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 350;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("database_content",content);
			}
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 346;
		web_content_parent.logSystemError(error,file_name,line_number);
}
	 
	 
});


client.on("get_home",function(){
	
	
	try{
	
	 fs.readFile("./web_content/home_content.html",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 383;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("home",content);
		
			}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 378;
		web_content_parent.logSystemError(error,file_name,line_number);
}
	 
	 
});

client.on("get_order_history",function(){
	
	try{
	
	 fs.readFile("./web_content/orderhistory.html",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 415;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("order_history",content);
		
			}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 411;
		web_content_parent.logSystemError(error,file_name,line_number);
} 
	 
	 
});


client.on("get_printco",function(){
	
	
	try{
	
	 fs.readFile("./web_content/printco.html",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 449;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("printco",content);
		
			}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 444;
		web_content_parent.logSystemError(error,file_name,line_number);
	}
	  
});

client.on("get_service_providers",function(){
	
	try{
	
	 fs.readFile("./web_content/service_providers.html",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 480;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		
				client.emit("service_providers",content);
		
			}
		
	});
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 476;
		web_content_parent.logSystemError(error,file_name,line_number);
}
	 
	 
});

client.on("get_terms",function(){
	
	
	try{
	
	 fs.readFile("./web_content/terms.html",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 514;
				web_content_parent.logFileSystemError(error,file_name,line_number);
				
			}else{
		 
				client.emit("terms",content);
			}
		
	});
	 
	 
	}catch(error){
	
		console.log(error);
		var file_name = "web_content.js",
		line_number = 509;
		web_content_parent.logSystemError(error,file_name,line_number);
} 
	 
	 
});


client.on("get_system_alerts_page",function(){
	
	try{
		
		 fs.readFile("./web_content/system_alerts.html",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					
					var file_name = "web_content.js",
					line_number = 548;
					web_content_parent.logFileSystemError(error,file_name,line_number);
					
				}else{
			 
					client.emit("system_alerts_page",content);
				}
			
		});
		 
		 
		}catch(error){
		
			console.log(error);
			var file_name = "web_content.js",
			line_number = 544;
			web_content_parent.logSystemError(error,file_name,line_number);
	} 
	
	
});


client.on("get_sign_in_page",function(){
	
	try{
		
		 fs.readFile("./web_content/sign_in.html",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					
					var file_name = "web_content.js",
					line_number = 548;
					web_content_parent.logFileSystemError(error,file_name,line_number);
					
				}else{
			 
					client.emit("sign_in_page",content);
				}
			
		});
		 
		 
		}catch(error){
		
			console.log(error);
			var file_name = "web_content.js",
			line_number = 544;
			web_content_parent.logSystemError(error,file_name,line_number);
	} 
	
	
});

client.on("get_video_services_page",function(){
	
	try{
		
		 fs.readFile("./web_content/video_services.html",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					
					var file_name = "web_content.js",
					line_number = 615;
					web_content_parent.logFileSystemError(error,file_name,line_number);
					
				}else{
			 
					client.emit("video_services_page",content);
				}
			
		});
		 
		 
		}catch(error){
		
			console.log(error);
			var file_name = "web_content.js",
			line_number = 611;
			web_content_parent.logSystemError(error,file_name,line_number);
	} 
	
	
});

client.on("get_add_end_user_form",function(){
	
	try{
		
		 fs.readFile("./web_content/add_end_user_form.html",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					
					var file_name = "web_content.js",
					line_number = 615;
					web_content_parent.logFileSystemError(error,file_name,line_number);
					
				}else{
			 
					client.emit("add_end_user_form",content);
				}
			
		});
		 
		 
		}catch(error){
		
			console.log(error);
			var file_name = "web_content.js",
			line_number = 648;
			web_content_parent.logSystemError(error,file_name,line_number);
	} 
	
	
});

};

exports.web_content = web_content;