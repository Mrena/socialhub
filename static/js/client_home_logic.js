

var client_home = function(socket){
	

	// start of home request and response
	$("#home").on("click",function(e){
		socket.emit("get_home");
		e.preventDefault();
		
	});
	
	socket.on("home",function(data){
		
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
		});
		
		
		
		});
	
	// end of home request and response
	
	
};


	