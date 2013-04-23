var home_da = require("./js/data_access/home_da");


var home = function(client,mysql_con,fs){
	
	
	client.on("get_cities",function(){
		
		home_da.getCities(client,mysql_con); 
		
	});
	
	client.on("get_packages",function(){
		
		home_da.getPackages(client,mysql_con);
		
	});
	
	
	
};

exports.home = home;