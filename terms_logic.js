

var terms = function(client,fs){
	
	client.on("get_terms",function(){
		
		 fs.readFile("./web_content/terms.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			 
			client.emit("terms",content);
			
		});
	});
	
};

exports.terms = terms;