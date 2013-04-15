

var client_provider_add_services = function(socket){
	
	
	try{
	
	$("#add_provider_services").on("click",function(e){
		
		$("#menu").hide();
		socket.emit("get_provider_services_page");
		e.preventDefault();
	});
	
	socket.on("provider_sevices_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			
		});
		
		
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