var messages_da = require(__dirname+"/data_access/messages_da");

var messages = function(client,mysql_con,fs){
	
	
	
	client.on("send_comment",function(objComment){
		try{
			
		objComment = JSON.parse(objComment);
		messages_da.sendComment(client,mysql_con,fs,objComment);
		
		}catch(error){
			console.log(error);
			var file_name = "messages.js",
			line_number = 8;
			messages_da.logSystemError(client,error,file_name,line_number);
		}
		
	});
	
	client.on("get_messages",function(){
		try{
			
		
			messages_da.getMessages(client,mysql_con,fs,"Admin");
	
		
		
		}catch(error){
			console.log(error);
			var file_name = "messages.js",
			line_number = 26;
			messages_da.logSystemError(client,error,file_name,line_number);
		}
		
	});
	
	client.on("mark_as_read",function(message_id){
		try{
			
			messages_da.markAsRead(client,mysql_con,fs,message_id);
	
		}catch(error){
			console.log(error);
			var file_name = "messages.js",
			line_number = 42;
			messages_da.logSystemError(client,error,file_name,line_number);
		}
		
	});
	
	
};

exports.messages = messages;