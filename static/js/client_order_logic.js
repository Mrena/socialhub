

var client_order = function(socket){
	
	
	try{

	// start of orderhistory request and response
	$("#orderhistory").click(function(e){
		
		socket.emit("get_order_history");
		e.preventDefault();
		
		});
	
	socket.on("order_history",function(data){
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$(this).html(data);
			$(this).fadeIn("slow",function(){
				$("#menu").show("slow");
			});
		});
		
		
	});
	// end of orderhistory request and response
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_order_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};