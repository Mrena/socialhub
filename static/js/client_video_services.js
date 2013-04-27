

var client_video_services = function(socket){
	
	
	$("#video_services").on("click",function(e){
		socket.emit("get_video_services_page");
		e.preventDefault();
		
	});
	
	socket.on("video_services_page",function(data){
		
			$("#page").html(data);
			sessionStorage['current_view'] = "video_service_providers_page";
			sessionStorage['listener_attached'] = "bogus";

		});
	
};