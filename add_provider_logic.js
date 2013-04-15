var web_content_parent = require("./web_content_parent");


var provider = function(client,fs){
	
	client.on("get_add_provider",function(){
		
		try{
		
		 fs.readFile("./web_content/add_provider.txt",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					var file_name = "add_provider_logic.js",
					line_number = 10;
					web_content_parent.logFileSystemError(error,file_name,line_number);
				
					
				}else{
			
					client.emit("add_provider",content);
			
				}
			
		});
		 
		}catch(error){
			
			console.log(error);
			var file_name = "add_provider_logic.js",
			line_number = 6;
			web_content_parent.logSystemError(error,file_name,line_number);
			} 
		 
		 
	});
	
	
	
	
	
};

exports.provider = provider;