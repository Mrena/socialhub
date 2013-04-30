


var client_messages = function(socket){
	
	
	
	$("#get_inbox").on("click",function(){
		
		socket.emit("get_messages");
		socket.emit("get_can_reply_to_users");
		
	});
	
	$("#messages_content").on("message_read_setup",function(e){
		
		$(this).html("<div id='message_from'></div><br /><div id='message></div>'");
		
	}).on("message",function(e){
		
		$("#message").html(e.message);
		
	}).on("message_from",function(){
		
		$("#message_from").html(e.message_from);
		
	});
	
	socket.on("messages",function(objMessages){
		
		objMessages = JSON.parse(objMessages);
		
		console.log("messages received");
		console.log(objMessages);
		var messages = [];
		objMessages.forEach(function(message,i){
			
			if(i===0)
			  messages.push("<ul class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>");
			
			 if(message.is_read)
				 messages.push(["<li class='ui-li ui-li-static ui-btn-up-f ui-corner-all' id='"+message.message_id+"'><h3 class='ui-li-heading'>",message.user_from,"</h3><p class='ui-li-desc'>",message.message.substr(0,20),"</p></li>"].join(''));
			 	else
			 		messages.push(["<li class='ui-li ui-li-static ui-btn-up-d ui-corner-all' id='"+message.message_id+"'><h3 class='ui-li-heading'>",message.user_from,"</h3><p class='ui-li-desc'>",message.message.substr(0,20),"</p></li>"].join(''));
				 
			 if(i===objMessages.length)
				 messages.push("</ul>");
			
		});
		
		$("#messages_content").html(messages.join(''));
		
		$("#messages_content ul li").on("click",function(e){
			e.preventDefault();
			var message_id = $(this).attr("id");
			socket.emit("mark_as_read",message_id);
			
			$("#messages_content").trigger("message_read_setup");
			
		});
		
		
	});
	
	
};

