
var client_about = function(socket){
	
	try{
	
	var showOperatingArea = function(){
		 
		  socket.emit("get_all_operating_areas");
	
	};
	
	// start of about request and response
	$("#about").on("click",function(e){
		
		socket.emit("get_about");
		sessionStorage['current_view'] = "about_page";
		e.preventDefault();
		
	});
	
	socket.on("about",function(data){
	
		if(sessionStorage['current_view'] === "about_page"){
			$("#page").html(data);
			showOperatingArea();
		}
		
	});
	
	// end of about request and response
	
	socket.on("operating_areas",function(areas){
			
		areas = JSON.parse(areas);
		var areas_list = [],
		    i = -1;
		
		areas.forEach(function(area){
			areas_list[++i]="<li>"+area+"</li>";
		});
		console.log(areas_list.join(' '));
		var $operating_areas = $("#operating_areas");
		$operating_areas.hide("fast",function(){
			
			$(this).html("<ul id='operating_area_list'></ul>");
			$(areas_list.join(' ')).appendTo("#operating_area_list");
			$operating_areas.show("slow");
		});
		
		
		
	});
	
	}catch(error){
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_about_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
};