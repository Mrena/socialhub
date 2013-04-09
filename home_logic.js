var home_da = require("./js/data_access/home_da");


var home = function(client,fs){
	
	client.on("get_home",function(){
		
		 fs.readFile("./web_content/home_content.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("home",content);
			
		});
	});
	
	client.on("get_cities",function(){
		
		home_da.getCities(client); 
		
	});
	
	client.on("get_packages",function(){
		
		home_da.getPackages(client);
		
	});
	
	
	
};

exports.home = home;