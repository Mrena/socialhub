

var client_about = function(socket){
	
	// start of about request and response
	$("#about").on("click",function(e){
		socket.emit("get_about");
		e.preventDefault();
		
	});
	
	socket.on("about",function(data){
		
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
		});
		
		
		
		});
	
	// end of about request and response
	
	
	
	
};