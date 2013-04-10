

var web_content = function(client,fs){
	
	client.on("get_provider_deliveries_page",function(){
		
		fs.readFile("./web_content/provider_deliveries.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
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
			
		}else{
		
		client.emit("service_provider_page",content);
		
		}
		
	});
});

	
};

exports.web_content = web_content;