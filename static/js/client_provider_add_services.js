

var client_provider_add_services = function(socket){
	
	
	
	try{
	
	$("#add_provider_services").on("click",function(e){
		
		socket.emit("get_provider_services_page");
		sessionStorage['current_view'] = "provider_services_page";
		e.preventDefault();
	});
	
	socket.on("provider_sevices_page",function(data){
		
		if(sessionStorage['current_view'] === "provider_services_page"){
			$("#content").html(data);
			sessionStorage['listener_attached'] = "bogus";
		
		}
		
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_add_provider_services.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};