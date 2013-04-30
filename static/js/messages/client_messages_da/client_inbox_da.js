

var InboxDA = (function InboxDA(){
	
	
	
	var db,
	    db_name = "PrintP",
	    db_descr = "PrintP Message Manager",
	    db_size = 5 *1024 *1024,
	    
	openDB = function(){
		
			db = openDatabase(db_name,db_descr,db_size);
		
	},
	emptyInboxTable = function(){
		
		db.transaction(function(tx){
			tx.executeSql("TRUNCATE INBOX",[],function(tx,rows){
				
				console.log("INBOX emptied");
				
			},function(tx,e){
				console.log("Error: Could not empty INBOX table. "+e.message);
			});
		});
		
	},
	populateMessages = function(objMessages){
		
		emptyInboxTable();
		
			db.transaction(function(tx){
				
				[].forEach.call(objMessages,function(message){
					
					console.log(this);
					
					tx.executeSql("INSERT INTO INBOX(message_id,user_from,user_to,message,is_read) VALUES(?,?,?,?,?)",[message.message_id,message.user_from,message.user_to,message.message,message.is_read],function(tx,rows){
						
					},function(tx,e){
						console.log("Error populating messages");
						break;
					});
				});
				
			});
			
	},
	getMessageById = function($messages_content,message_id){
		
		db.transaction(function(tx){
			tx.executeSql("SELECT message FROM INBOX WHERE message_id = ?",[message_id],function(tx,rows){
				
				if(rows.length == 1){
				
					$messages_content.trigger({
						type : "message",
						message : rows.item(0).message
					});
				}
				
			},function(tx,e){
				console.log("ERROR: Could not get message. "+e.message);
			});
		});
		
	},
	getMessageFromById = function($messages_content,message_id){
		
		db.transaction(function(tx){
			tx.executeSql("SELECT user_from FROM INBOX WHERE message_id = ?",[message_id],function(tx,rows){
				
				if(rows.length == 1){
				
					$messages_content.trigger({
						type : "message_from",
						message : rows.item(0).user_from
					});
				}
				
			},function(tx,e){
				console.log("ERROR: Could not get message where the message is from. "+e.message);
			});
		});
		
	},
	createInboxTable = function(){
		
		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS INBOX(message_id INTEGER PRIMARY KEY AUTO_INCREMENT,user_from TEXT NOT NULL,user_to VARCHAR(50) NOT NULL,message TEXT NOT NULL,is_read INTEGER NOT NULL)",[],function(tx,rows){
				console.log("Inbox table created");
			},function(tx,e){
				
				console.log("Error: "+e.message);
			});
		});
		
	},
	init = function(){
		
		openDB();
		if(!localStorage['printp_inbox_created'])
			createInboxTable();
		
		
	};
	
	return {
		
		init : init,
		populateMessages : populateMessages,
		getMessageById : getMessageById,
		getMessageFromById : getMessageFromById
		
	};
	
})();