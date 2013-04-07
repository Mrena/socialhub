

var terms = function(client,fs){
	
	client.on("get_terms",function(){
		
		 fs.readFile("./web_content/terms.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("terms",content);
			
		});
	});
	
	
	
};

exports.terms = terms;