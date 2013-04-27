


var client_more_options = function(socket){
	
	
	$("#back").on("click",function(e){
		
		$("#new_menu").hide();
		$("#default_menu").show();
		
		e.preventDefault();
	});
	
	$("#catcha_manager").on("click",function(e){
		
		socket.emit("get_catcha_manager_page");
		
		e.preventDefault();
	});
	
	socket.on("catcha_manager_page",function(data){
		
		$("#content").html(data);
		client_catcha_manager(socket);
		
	});
	
	$("#messages").on("click",function(e){
		
		socket.emit("get_messages_page");
		
		
		e.preventDefault();
	});
	
	socket.on("messages_page",function(data){
		
		$("#content").html(data);
		client_messages(socket);
		
	});
	
	$("#admin_actions_tracker").on("click",function(e){
		
		socket.emit("get_admin_actions_page");
		
		
		e.preventDefault();
	});
	
	socket.on("admin_actions_page",function(data){
		
		$("#content").html(data);
		client_admin_actions(socket);
		
	});
	
	$("#simulators").on("click",function(e){
		
		socket.emit("get_simulators_page");
		e.preventDefault();
	});
	
	socket.on("simulators_page",function(data){
		
		$("#content").html(data);
		client_simulators(socket);
		
	});
	

	
	
	
	
	
};

