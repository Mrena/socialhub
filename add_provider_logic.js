

var provider = function(client,fs){
	
	client.on("get_add_provider",function(){
		
		 fs.readFile("./web_content/add_provider.txt",'utf8',function(error,content){
			 if(error){
					
				 console.trace(error);
					client.emit("page_not_found");
					
					var system_error = {
							"error" : error
						};
				
					fs.appendFile('./js/data_access/log_files/system_errors.txt',JSON.stringify(system_error).concat('\n'),'utf8',function(err){
						if(err){
							console.trace(err);
							// if we can't read both files email the error to Admin for immediate attention.
							
						}
					});
					
				}else{
			
					client.emit("add_provider",content);
			
				}
			
		});
	});
	
	
	
};

exports.provider = provider;