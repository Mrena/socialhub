var end_users_da = require("./data_access/end_users_da");
var system_alerts_da = require("./data_access/system_alerts_da");

var end_users = function(client,mysql_con,fs){
	
	client.on("get_all_end_users",function(){
		try{
			
		end_users_da.getAllEndUsers(client,mysql_con);
		
		}catch(error){
			console.log(error);
			var file_name = "end_users.js",
			line_number = 8;
			end_users_da.logSystemError(client,error,file_name,line_number);
		}
		
	});
	
	client.on("submit_end_user",function(objEndUser){
		try{
			
		objEndUser = JSON.parse(objEndUser);	
			
		end_users_da.submitEndUser(client,mysql_con,objEndUser);
		system_alerts_da.sendUserSignUpAlert(client);
		
		}catch(error){
			console.log(error);
			var file_name = "end_users.js",
			line_number = 20;
			end_users_da.logSystemError(client,error,file_name,line_number);
		}
		
	});
	
	
};

exports.end_users = end_users;