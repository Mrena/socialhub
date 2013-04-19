

var client_video_services = function(socket){
	
	
	$("#video_services").on("click",function(e){
		socket.emit("get_video_services_page");
		e.preventDefault();
		
	});
	
	socket.on("video_services_page",function(data){
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$(this).html(data);
			$("#page").fadeIn("slow",function(){
				$("#menu").show("slow");
			});
		});
			
		});
	
	
	
	
	
};