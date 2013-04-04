

var about = function(client,fs){
	
	client.on("get_about",function(){
		
		 fs.readFile("./about.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("about",content);
			
		});
	});
	
	
};

exports.about = about;