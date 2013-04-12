

var client_provider_deliveries = function(socket){
	
	
	

	$("#provider_deliveries").on("click",function(e){
		
		$("#menu").hide();
		socket.emit("get_provider_deliveries_page");
		
		e.preventDefault();
	});
	
	socket.on("provider_deliveries_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			
		});
		
	});
	
	
};