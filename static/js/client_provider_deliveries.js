

var client_provider_deliveries = function(socket){
	
	
	try{

	$("#provider_deliveries").on("click",function(e){
		
		socket.emit("get_provider_deliveries_page");
		sessionStorage['current_view'] = "provider_deliveries_page";
		e.preventDefault();
	});
	
	socket.on("provider_deliveries_page",function(data){
		
		if(sessionStorage['current_view'] === "provider_deliveries_page"){
			$("#content").html(data);
			sessionStorage['listener_attached'] = "bogus";
		
		}
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_provider_deliveries.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};