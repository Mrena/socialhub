

var client_printco = function(socket){
	
	// start of printco request and response
	$("#printco").on("click",function(e){
		socket.emit("get_printco");
		e.preventDefault();
		
	});
	
	socket.on("printco",function(data){
		
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
			$("#menu").show("slow");
		});
		
		
		
		});
	
	// end of printco request and response
	
};
