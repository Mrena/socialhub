

var contact = function(client,fs){
	
	
	client.on("get_contact",function(){
		
		 fs.readFile("./web_content/contact.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("contact",content);
			
		});
	});
	
	
};

exports.contact = contact;