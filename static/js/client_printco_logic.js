

var client_printco = function(socket){
	
	// start of printco request and response
	$("#printco").on("click",function(e){
		socket.emit("get_printco");
		e.preventDefault();
		
	});
	
	socket.on("printco",function(data){
		
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
		});
		
		
		
		});
	
	// end of printco request and response
	
};
