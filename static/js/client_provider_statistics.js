

var client_provider_statistics = function(socket){
	
	
	$("#provider_statistics").on("click",function(e){
		
		$("#menu").hide();
		socket.emit("get_provider_statistics_page");
		
		e.preventDefault();
	});
	
	socket.on("provider_statistics_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			
		});
		
	});
	
};