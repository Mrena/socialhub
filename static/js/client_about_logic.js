

var client_about = function(socket){
	
	var showOperatingArea = function(){
		 
		  socket.emit("get_all_operating_areas");
	
	};
	
	// start of about request and response
	$("#about").on("click",function(e){
		socket.emit("get_about");
		e.preventDefault();
		
	});
	
	socket.on("about",function(data){
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			showOperatingArea();
			$("#page").fadeIn();
			$("#menu").show("slow");
		});
		
		
		
		});
	
	// end of about request and response
	
	socket.on("operating_areas",function(areas){
			
		areas = JSON.parse(areas);
		$("#operating_areas").html("<ul>");
		areas.forEach(function(area){
			$("#operating_areas").append("<li>"+area+"</li>");
		});
		
		$("#operating_areas").append("</ul>");
		
	});
	
	
	
	
};