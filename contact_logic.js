

var contact = function(client,fs){
	
	
	client.on("get_contact",function(){
		
		 fs.readFile("./web_content/contact.txt",'utf8',function(error,content){
			 if(error){
					
					console.trace(error);
					client.emit("page_not_found");
					
				}
			
			client.emit("contact",content);
			
		});
	});
	
	
};

exports.contact = contact;