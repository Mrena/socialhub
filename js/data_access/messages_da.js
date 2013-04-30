var startup_da_parent = require(__dirname+"/startup_da_parent");


var sendComment = function(client,mysql_con,fs,objComment){
	

	query = "INSERT INTO Messages(user_from,user_to,message,is_read) VALUES('"+["Name: "+objComment.name,"Email: "+objComment.email_address,"Phone Number"+objComment.phone_number].join("\n")+"','Admin','"+objComment.comment+"',0)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "messages_da.js",
		line_number = 7;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("send_comment_error");
		
	},function(client){
		
		client.emit("comment_sent");
 });
	
};

var getMessages = function(client,mysql_con,fs,current_client){
	
	try{
	console.log(current_client);
	var query = "SELECT * FROM Messages WHERE user_to='"+current_client+"' ORDER BY message_id";
	startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
		
		client.emit("get_messages_error");
		
		console.trace(error);
		var file_name = "messages_da.js",
		line_number = 28;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		
		
	},function(client,rows,fields){
		
		console.log(typeof rows);
		
		var messages = [];
    	
		for(var i=0,len = rows.length;i<len;i++){
    		
			rows[i].is_read = parseInt(rows[i].is_read);
			
    		messages.push(rows[i]);
    		
		}
    	
    	
    	client.emit("messages",JSON.stringify(messages));
	});
	
	}catch(error){
		
		client.emit("get_messages_error");
		// System error logging
		console.log(error);
		var file_name = "messages_da.js",
		line_number = 28;
		startup_da_parent.logSystemError(client,error,file_name,line_number);
	}
	
};

var markAsRead = function(client,mysql_con,fs,message_id){
	

	query = "UPDATE Messages SET is_read = 1 WHERE message_id = "+message_id+"";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "messages_da.js",
		line_number = 75;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("mark_as_read_error");
		
	},function(client){
		
		client.emit("marked_as_read");
 });
	
};

var deleteMessage = function(client,mysql_con,fs,message_id){
	

	query = "DELETE FROM Messages WHERE message_id = "+message_id+"";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		var file_name = "messages_da.js",
		line_number = 91;
		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
		client.emit("delete_message_error");
		
	},function(client){
		
		getMessages(client,mysql_con,fs,"Admin");
		console.log("Message deleted: "+message_id);
 });
	
};


exports.sendComment = sendComment;
exports.getMessages = getMessages;
exports.markAsRead = markAsRead;
exports.deleteMessage = deleteMessage;
exports.logSystemError = startup_da_parent.logSystemError;