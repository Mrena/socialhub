

var client_provider_statistics = function(socket){
	
	
	try{
	
	$("#provider_statistics").on("click",function(e){
		
		$("#menu").hide();
		socket.emit("get_provider_statistics_page");
		
		e.preventDefault();
	});
	
	socket.on("provider_statistics_page",function(data){
		
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
				"file_name" : "client_provider_statistics.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
};