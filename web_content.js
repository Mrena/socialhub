var web_content_parent = require("./web_content_parent");

var web_content = function(client,fs){
	
	client.on("get_provider_deliveries_page",function(){
		
		fs.readFile("./web_content/provider_deliveries.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 7;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
				
			}else{
			
			client.emit("provider_deliveries_page",content);
			
			}
			
		});
		
	});
	
	client.on("get_provider_statistics_page",function(){
		
		fs.readFile("./web_content/provider_statistics.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 27;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
				
			}else{
			
			client.emit("provider_statistics_page",content);
			
			}
			
		});
		
	});
	
	client.on("get_provider_services_page",function(){
		
		fs.readFile("./web_content/add_provider_services.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 47;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
			
			client.emit("provider_sevices_page",content);
			
			}
			
		});
		
	});
	
	client.on("get_edit_provider_info_page",function(){
		
		fs.readFile("./web_content/edit_provider_info.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 66;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
			
			client.emit("edit_provider_info_page",content);
			
			}
			
		});
		
	});
	
	
client.on("get_system_errors_page",function(){
		
		fs.readFile("./web_content/system_errors.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 86;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
				
			}else{
			
			client.emit("system_errors_page",content);
			
			}
			
		});
		
	});


client.on("get_end_users_page",function(){
	
	fs.readFile("./web_content/end_users.txt",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 107;
			web_content_parent.logFileSystemErrors(error,file_name,line_number);
			
		}else{
		
		client.emit("end_users_page",content);
		
		}
		
	});
	
 });


client.on("get_service_provider_page",function(){
	
	fs.readFile("./provider.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 127;
			web_content_parent.logFileSystemErrors(error,file_name,line_number);
			
		}else{
		
		client.emit("service_provider_page",content);
		
		}
		
	});
});


client.on("redirect_home",function(){
	
	fs.readFile("./game.html",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			var file_name = "web_content.js",
				line_number = 146;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
			
			
			
		}else{
		
		client.emit("redirected_home",content);
		
		}
		
	});
});


client.on("get_about",function(){
	
	 fs.readFile("./web_content/about.txt",'utf8',function(error,content){
		if(error){
			
			console.trace(error);
			client.emit("page_not_found");
			
			var file_name = "web_content.js",
			line_number = 168;
			web_content_parent.logFileSystemErrors(error,file_name,line_number);
			
		}else{
		
		client.emit("about",content);
		
		}
		
	});
});

client.on("get_contact",function(){
	
	 fs.readFile("./web_content/contact.txt",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 186;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("contact",content);
		
			}
		
	});
});


client.on("get_database_content",function(){
	
	 fs.readFile("./web_content/startup_database.txt",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 205;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("database_content",content);
			}
	});
});


client.on("get_home",function(){
	
	 fs.readFile("./web_content/home_content.txt",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 222;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("home",content);
		
			}
		
	});
});

client.on("get_order_history",function(){
	
	 fs.readFile("./web_content/orderhistory.txt",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 240;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("order_history",content);
		
			}
		
	});
});


client.on("get_printco",function(){
	
	 fs.readFile("./web_content/printco.txt",'utf8',function(error,content){
		 if(error){
				
			 console.trace(error);
				client.emit("page_not_found");
				var file_name = "web_content.js",
				line_number = 259;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("printco",content);
		
			}
		
	});
});

client.on("get_service_providers",function(){
	
	 fs.readFile("./web_content/service_providers.txt",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 277;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		
				client.emit("service_providers",content);
		
			}
		
	});
});

client.on("get_terms",function(){
	
	 fs.readFile("./web_content/terms.txt",'utf8',function(error,content){
		 if(error){
				
			 	console.trace(error);
				client.emit("page_not_found");
				
				var file_name = "web_content.js",
				line_number = 295;
				web_content_parent.logFileSystemErrors(error,file_name,line_number);
				
			}else{
		 
				client.emit("terms",content);
		
			}
		
	});
});




	
};

exports.web_content = web_content;