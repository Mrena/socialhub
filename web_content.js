

var web_content = function(client,fs){
	
	client.on("get_provider_deliveries_page",function(){
		
		fs.readFile("./web_content/provider_deliveries.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
			}
			
			client.emit("provider_deliveries_page",content);
			
		});
		
	});
	
	client.on("get_provider_statistics_page",function(){
		
		fs.readFile("./web_content/provider_statistics.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
			}
			
			client.emit("provider_statistics_page",content);
			
		});
		
	});
	
	client.on("get_provider_services_page",function(){
		
		fs.readFile("./web_content/add_provider_services.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
			}
			
			client.emit("provider_sevices_page",content);
			
		});
		
	});
	
	client.on("get_edit_provider_info_page",function(){
		
		fs.readFile("./web_content/edit_provider_info.txt",'utf8',function(error,content){
			if(error){
				
				console.trace(error);
				client.emit("page_not_found");
				
			}
			
			client.emit("edit_provider_info_page",content);
			
		});
		
	});
		
};

exports.web_content = web_content;