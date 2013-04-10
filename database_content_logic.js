
var database = function(client,fs){
	
	client.on("get_database_content",function(){
		
		 fs.readFile("./web_content/startup_database.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			
			client.emit("database_content",content);
			
		});
	});
	
	
	
};

exports.database = database;