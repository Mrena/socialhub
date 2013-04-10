

var service_providers = function(client,fs){
	
	client.on("get_service_providers",function(){
		
		 fs.readFile("./web_content/service_providers.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			
			client.emit("service_providers",content);
			
		});
	});
	
	
	
};

exports.service_providers = service_providers;