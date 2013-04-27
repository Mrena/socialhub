

var client_catcha_manager = function(socket){
	
	var $catcha_manager_content = $("#catcha_manager_content");
	$("#add_catcha_image").on("click",function(e){
		
		socket.emit("get_add_catcha_page");
		
		e.preventDefault();
	});
	
	
	socket.on("add_catcha_page",function(data){
		
		$catcha_manager_content.html(data);
		client_add_catcha(socket);
		
	});
	
	$("#get_all_catcha_images").on("click",function(e){
		
	    client_all_catcha(socket);
		
		e.preventDefault();
	});
	
	
	
	
	
	
	
};