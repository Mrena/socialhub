

var client_order = function(socket){
	

	// start of orderhistory request and response
	$("#orderhistory").click(function(e){
		
		socket.emit("get_order_history");
		e.preventDefault();
		
		});
	
	socket.on("order_history",function(data){
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			$("#page").fadeIn();
			$("#menu").show("slow");
		});
		
	});
	// end of orderhistory request and response
	
	
};