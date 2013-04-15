

var client_terms = function(socket){
	
	
	try{
	
	// start of terms request and response
	$("#terms").on("click",function(e){
		socket.emit("get_terms");
		e.preventDefault();
		
	});
	
	socket.on("terms",function(data){
		
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
			$("#menu").show("slow");
		});
		
		
		
		});
	
	// end of terms request and response
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_terms_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};