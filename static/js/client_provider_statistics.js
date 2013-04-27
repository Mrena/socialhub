

var client_provider_statistics = function(socket){
	
	
	try{
	
	$("#provider_statistics").on("click",function(e){
		
		socket.emit("get_provider_statistics_page");
		sessionStorage['current_view'] = "provider_statistics_page";
		e.preventDefault();
	});
	
	socket.on("provider_statistics_page",function(data){
		
		if(sessionStorage['current_view'] === "provider_statistics_page"){
			$("#content").html(data);
			sessionStorage['listener_attached'] = "bogus";
		
		}
		
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_provider_statistics.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
};