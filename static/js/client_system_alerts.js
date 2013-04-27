


var system_alerts = function(socket){
	
	
	$("#user_sign_up1, #user_sign_up2").on("change",function(e){
		
		console.log($(this).val());
		var objAdminAlert = {
				username : "Admin",
				alert_type : "user_sign_up",
				alert_value : $(this).val()
				
		};
		
		socket.emit("update_admin_alerts",JSON.stringify(objAdminAlert));
	});
	
	
	$("#provider_sign_up1, #provider_sign_up2").on("change",function(e){
		
		console.log($(this).val());
		var objAdminAlert = {
				username : "Admin",
				alert_type : "provider_sign_up",
				alert_value : $(this).val()
				
		};
		
		socket.emit("update_admin_alerts",JSON.stringify(objAdminAlert));
		
	});
	

	$("#order1, #order2").on("change",function(e){
	
		console.log($(this).val());
		var objAdminAlert = {
				username : "Admin",
				alert_type : "order",
				alert_value : $(this).val()
				
		};
		
		socket.emit("update_admin_alerts",JSON.stringify(objAdminAlert));
	
	});

};