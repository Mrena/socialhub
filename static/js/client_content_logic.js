

var client_content = function(socket){
	
	
	try{
	
	// start of contact request and response
	$("#contact").on("click",function(e){
		socket.emit("get_contact");
		e.preventDefault();
		
	});
	
	socket.on("contact",function(data){
		
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
		});
		
		
		});
	
	// end of contact request and response
	
	}catch(error){
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_content_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};

exports.client_content = client_content;