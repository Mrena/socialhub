

var client_terms = function(socket){
	
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
	
};