

var client_provider_add_services = function(socket){
	
	
	
	$("#add_provider_services").on("click",function(e){
		
		$("#menu").hide();
		socket.emit("get_provider_services_page");
		e.preventDefault();
	});
	
	socket.on("provider_sevices_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			
		});
		
		
	});
	
	
};