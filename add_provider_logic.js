var web_content_parent = require("./web_content_parent");


var provider = function(client,mysql_con,fs){
	
	client.on("get_add_provider",function(){
		
		try{
		
		 fs.readFile("./web_content/add_provider.html",'utf8',function(error,content){
			 if(error){
					
				 	console.trace(error);
					client.emit("page_not_found");
					var file_name = "add_provider_logic.js",
					line_number = 10;
					web_content_parent.logFileSystemError(client,error,file_name,line_number);
				
					
				}else{
			
					client.emit("add_provider",content);
			
				}
			
		});
		 
		}catch(error){
			
			console.log(error);
			var file_name = "add_provider_logic.js",
			line_number = 6;
			web_content_parent.logSystemError(client,error,file_name,line_number);
			} 
		 
		 
	});
	
	
	
	
	
};

exports.provider = provider;