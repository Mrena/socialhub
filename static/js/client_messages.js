


var client_messages = function(socket){
	
	
	$("#get_inbox").on("click",function(e){
		e.preventDefault();
		
		socket.emit("get_messages");
		
	});
	
	$("#new_message").on("click",function(){
		
		//$("#messages")
		
	});
	
	$("#messages_content").on("message_read_setup",function(e){
		
		e.stopPropagation();
		
		$(this).html("<br /><div class='ui-shadow ui-corner-all ui-body-corner-all' style='padding:30px;'><div id='message_from'></div><br /><div id='message'></div></div>");
		
	}).on("inbox_emptied",function(e){
		
		InboxDA.populateMessages(objMessages);
		console.log("messages emptied for real");
		
		
	}).on("message",function(e){
		
		e.stopPropagation();
		$("#message").html(e.message);
		$(document).triggerHandler("hide_loading");
		
	}).on("message_from",function(e){
		
		e.stopPropagation();
			e.message_from.splitWhere("Email",function(fromArray){
				
				if(typeof fromArray == "object" || typeof fromArray == "array"){
						$("#message_from").html("<h4>"+fromArray.join("<br />")+"</h4>");
						$("<br /><a href='#'  id='message_back' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-d'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text'>Back</span></span></a><a href='#'  id='delete_message_"+e.id+"' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-d'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text'>Delete</span></span></a>").appendTo("#messages_content");
				        $("#messages_content").trigger({
				        	type : "attach_message_listeners",
				        	message_id : e.id
				        });
				}else{
					
					 $("#message_from").html(["<h4>",fromArray,"</h4>"].join(''));
					 $("#messages_content").trigger({
				        	type : "attach_message_listeners",
				        	message_id : e.id
				        });
				}
				
			},function(e){
				
				console.log("Error: "+e);
				
			});
			
	}).on("attach_message_listeners",function(e){
		e.stopPropagation();
		var message_id = e.message_id;
		
		$("#message_back").on("click",function(e){
			e.preventDefault();
		    e.stopPropagation();
			socket.emit("get_messages");
		});
		
		$("#delete_message_"+message_id).on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			socket.emit("delete_message",message_id);
		});
		
	});
	
	socket.on("messages",function(messages){
		
		objMessages = JSON.parse(messages);
		InboxDA.emptyInboxTable();
		
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
			e.stopPropagation();
			e.preventDefault();
			var message_id = $(this).attr("id");
			socket.emit("mark_as_read",message_id);
			
			$(document).triggerHandler("show_loading");
			
			$("#messages_content").trigger("message_read_setup");
				InboxDA.getMessageById($("#messages_content"),message_id);
				InboxDA.getMessageFromById($("#messages_content"),message_id);
		
		});
		
		
	});
	
	
};

