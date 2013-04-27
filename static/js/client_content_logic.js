

var client_content = function(socket){
	
	
	try{
	
	// start of contact request and response
	$("#contact").on("click",function(e){
		socket.emit("get_contact");
		e.preventDefault();
		
	});
	
	socket.on("contact",function(data){
	
			$("#page").html(data);
			sessionStorage['current_view'] = "contact_page";
		
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