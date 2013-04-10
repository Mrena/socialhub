

var print = function(client,fs){
	
	client.on("get_printco",function(){
		
		 fs.readFile("./web_content/printco.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			
			client.emit("printco",content);
			
		});
	});
	
	
	
};

exports.print = print;