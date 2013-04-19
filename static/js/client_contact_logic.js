

var client_contact = function(socket){
	
	try{
	
	// start of contact request and response
	$("#contact").on("click",function(e){
		socket.emit("get_contact");
		e.preventDefault();
		
	});
	
	socket.on("contact",function(data){
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$(this).html(data);
			$(this).fadeIn("slow",function(){
				$("#menu").show("slow");
			});
		});
		
		
		});
	
	// end of contact request and response
	
	}catch(error){
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_contact_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
	
};
