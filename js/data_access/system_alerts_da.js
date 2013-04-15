var startup_da_parent = require("./startup_da_parent");


	var updateAdminAlerts = function(client,username,alert_type,alert_value){
	
			
		try{
			
			var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
				var query = "UPDATE Alerts SET "+alert_type+" = '"+alert_value+"'  WHERE username = '"+username+"' ";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					var file_name = "system_alerts_da.js",
					line_number = 13;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
					
					},function(client){
						
						client.emit("update_admin_alerts_success");
				});
				
			}catch(error){
				// System error logging
				console.log(error);
				var file_name = "system_alerts_da.js",
				line_number = 4;
				startup_da_parent.logSystemError(error,file_name,line_number);
			}
			
	
	};
	
	var sendSMSAlert = function(phone_number,message){
		
		
		
		
	};
	
	var sendEmailAlert = function(email_address,message){
		
		
		
		
	};
	
	var sendUserSignUpAlert = function(client){
		
		try{
			
			var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
				var query = "SELECT new_user_sign_up,username FROM Alerts";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					var file_name = "system_alerts_da.js",
					line_number = 45;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
					
					},function(client){
						
						// for each admin check if they have to receive an email or sms, and send whatever is appropriate
						
						
						//client.emit("send_user_signup_alert_success");
				});
				
			}catch(error){
				// System error logging
				console.log(error);
				var file_name = "system_alerts_da.js",
				line_number = 37;
				startup_da_parent.logSystemError(error,file_name,line_number);
			}
		
		
		
	};
	
	var sendProviderSignUpAlert = function(client){
		
		try{
			
			var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
				var query = "SELECT new_provider,username FROM Alerts";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					var file_name = "system_alerts_da.js",
					line_number = 45;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
					
					},function(client){
						
						// for each admin check if they have to receive an email or sms, and send whatever is appropriate
						
						
						//client.emit("send_user_signup_alert_success");
				});
				
			}catch(error){
				// System error logging
				console.log(error);
				var file_name = "system_alerts_da.js",
				line_number = 37;
				startup_da_parent.logSystemError(error,file_name,line_number);
			}
		
		
		
		
		
	};
	
	var sendNewOrderAlert = function(client){
		
		
		try{
			
			var mysql_con = startup_da_parent.connection();
			mysql_con.connect();
			
				var query = "SELECT new_order,username FROM Alerts";
				startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
					
					console.trace(error);
					var file_name = "system_alerts_da.js",
					line_number = 45;
					startup_da_parent.logDatabaseSystemError(error,file_name,line_number);
					
					
					},function(client){
						
						// for each admin check if they have to receive an email or sms, and send whatever is appropriate
						
						
						//client.emit("send_user_signup_alert_success");
				});
				
			}catch(error){
				// System error logging
				console.log(error);
				var file_name = "system_alerts_da.js",
				line_number = 37;
				startup_da_parent.logSystemError(error,file_name,line_number);
			}
		
		
	};
	
	
	
exports.updateAdminAlerts = updateAdminAlerts;
exports.sendUserSignUpAlert = sendUserSignUpAlert;
exports.sendProviderSignUpAlert = sendProviderSignUpAlert;
exports.sendNewOrderAlert = sendNewOrderAlert;