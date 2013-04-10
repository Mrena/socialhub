

var provider = function(client,fs){
	
	client.on("get_add_provider",function(){
		
		 fs.readFile("./web_content/add_provider.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			
			client.emit("add_provider",content);
			
		});
	});
	
	
	
};

exports.provider = provider;