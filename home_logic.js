
var home = function(client,fs){
	
	client.on("get_home",function(){
		
		 fs.readFile("./home_content.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("home",content);
			
		});
	});
	
	
	
};

exports.home = home;