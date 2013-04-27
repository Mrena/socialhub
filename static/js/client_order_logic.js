

var client_order = function(socket){
	
	
	try{

	// start of orderhistory request and response
	$("#orderhistory").click(function(e){
		
		socket.emit("get_order_history");
		sessionStorage['current_view'] = "order_history_page";
		e.preventDefault();
		
		});
	
	socket.on("order_history",function(data){
		
		if(sessionStorage['current_view'] === "order_history_page"){
			$("#page").html(data);

		}
			
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