

var InboxDA = (function InboxDA(){
	
	var db,
	    db_name = "PrintP",
	    db_version = "1.0",
	    db_descr = "PrintP Message Manager",
	    db_size = 5 *1024 *1024,
	    
	openDB = function(){
		try{
			db = openDatabase(db_name,db_version,db_descr,db_size);
			
		}catch(e){
			
			console.log(e);
		}
		
	},
	deleteInboxTable = function(){
		
		db.transaction(function(tx){
			tx.executeSql("DROP TABLE INBOX",[],function(tx,result){
				
				console.log("INBOX dropped");
				
			},function(result,e){
				
				console.log("Error: Could not drop INBOX table. "+e.message);
				
			});
		});
		
	},
	deleteMessageById = function(message_id){
		
		db.transaction(function(tx){
			tx.executeSql("DELETE FROM INBOX WHERE message_id = ?",[message_id],function(tx,result){
				
				console.log("Deleting message "+message_id);
				
			},function(tx,e){
				console.log("Error deleting message "+message_id);
			});
		});
		
	},
	deleteAllInbox = function(){
		
		db.transaction(function(tx){
			tx.executeSql("SELECT message_id FROM INBOX",[],function(tx,result){
				
				if(result.rows.length==0){
					$("#messages_content").trigger("inbox_emptied");
					
				}else{
					
					for(var i=0,len = result.rows.length;i<len;i++){
					
						var message_id = result.rows.item(i).message_id;
						deleteMessageById(message_id);
					
						if(i==len-1){
						
							$("#messages_content").trigger("inbox_emptied");
							
						}
				}
				
			}
				
			},function(tx,e){
				
				console.log("Error selecting message_id. Error: "+e.message);
			});
			
		});
		
	},
	emptyInboxTable = function(){
		
		db.transaction(function(tx){
			tx.executeSql("TRUNCATE TABLE INBOX",[],function(tx,result){
				
				$("#messages_content").trigger("inbox_emptied");
				
			},function(result,e){
				
				deleteAllInbox();
				
			});
		});
		
	},
	populateMessages = function(objMessages){
		
			db.transaction(function(tx){
				
				[].forEach.call(objMessages,function(message){
				
					tx.executeSql("INSERT INTO INBOX(message_id,user_from,user_to,message,is_read) VALUES(?,?,?,?,?)",[message.message_id,message.user_from,message.user_to,message.message,message.is_read],function(tx,result){
						
					},function(tx,e){
						console.log("Error populating messages "+e.message);
						return;
					});
				});
				
			});
			
	},
	getMessageById = function($messages_content,message_id){
		
		db.transaction(function(tx){
			tx.executeSql("SELECT message FROM INBOX WHERE message_id = ?",[message_id],function(tx,result){
				console.log(result);
				if(result.rows.length == 1){
					$("#messages_content").trigger({
						type : "message",
						message : result.rows.item(0).message
					});
					
				}else{
					console.log("message not found");
				}
				
			},function(tx,e){
				console.log("ERROR: Could not get message. "+e.message);
			});
		});
		
	},
	getMessageFromById = function($messages_content,message_id){
		
		db.transaction(function(tx){
			tx.executeSql("SELECT user_from FROM INBOX WHERE message_id = ?",[message_id],function(tx,result){
				
				if(result.rows.length == 1){
				    
					$("#messages_content").trigger({
						type : "message_from",
						message_from : result.rows.item(0).user_from,
						id : message_id
					});
					
				}else{
					
					console.log("Message from not found");
				}
				
			},function(tx,e){
				console.log("ERROR: Could not get where the message is from. "+e.message);
			});
		});
		
	},
	createInboxTable = function(){
		
		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS INBOX(message_id INTEGER PRIMARY KEY,user_from TEXT NOT NULL,user_to VARCHAR(50) NOT NULL,message TEXT NOT NULL,is_read INTEGER NOT NULL)",[],function(tx,result){
				console.log("Inbox table created");
				localStorage['printp_inbox_created'] = "true";
			},function(result,e){
				
				console.log("Error: "+e.message);
			});
		});
		
	},
	init = function(){
		try{
		
			openDB();
		if(!localStorage['printp_inbox_created'])
			createInboxTable();
			console.log("init");
		
		}catch(e){
			console.log(e);
		}
		
		
	}();
	
	return {
		
		populateMessages : populateMessages,
		getMessageById : getMessageById,
		getMessageFromById : getMessageFromById,
		emptyInboxTable : emptyInboxTable
		
	};
	
})();
