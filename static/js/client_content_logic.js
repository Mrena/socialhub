

var client_content = function(socket){
	
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
	
	
};

exports.client_content = client_content;