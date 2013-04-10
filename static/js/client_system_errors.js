

var client_system_errors = function(socket){
	
	
	
	
	
	
	
	$("#system_errors").on("click",function(e){
		$("#menu").hide();
		socket.emit("get_system_errors_page");
		
		e.preventDefault();
	});
	
	socket.on("system_errors_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
			}).fadeIn("slow",function(){
				$("#menu").show("slow");
				
			});
		
	
		});
	
};