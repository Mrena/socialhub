

var client_order = function(socket){
	

	// start of orderhistory request and response
	$("#orderhistory").click(function(e){
		
		socket.emit("get_order_history");
		e.preventDefault();
		
		});
	
	socket.on("order_history",function(data){
		
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
		});
		
	});
	// end of orderhistory request and response
	
	
};