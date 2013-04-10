

var client_end_users = function(socket){
	
	
	
	
	
	
	
	
	
	// start of end_users request and response
	$("#end_users").on("click",function(e){
		$("#menu").hide();
		socket.emit("get_end_users_page");
		e.preventDefault();
		
	});
	
	socket.on("end_users_page",function(data){
		console.log(data);
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			
		});
	});
	
	// end of end_users request and response
	
};