// XO

var init = function(io){
	
	
	 var onlineUsers = new Array();
	    var gameOnlineUsers = new Array();
	    var xo = require("./xo_logic");
		
		var game = io.of('/game').on("connection",function(client){
			
			// game logic
			client.on("join",function(data){
				// client.get("socialhub_active",function(error,socialhub_active){
					// if(socialhub_active=="true"){
					 var disconnected = false;
						gameOnlineUsers.forEach(function(user){
							client.get("username",function(error,name){
								 if(name == user){
									 client.emit("user_already_logged");
									 disconnected = true;
								 }
							});
						});
						if(!disconnected){
						client.set("username",data);
						gameOnlineUsers.push(data);
						client.emit("online_users",JSON.stringify(gameOnlineUsers));
						}
						
					// }
				// });	
			});
			
			
			
			client.on("get_online_users",function(){
				client.emit("online_users",JSON.stringify(gameOnlineUsers));
				
			});
			
			client.on("join_game",function(data){
			 //client.get("socialhub_active",function(error,socialhub_active){
				//      if(socialhub_active=="true"){
				    	  var disconnected = false;
				    	  gameOnlineUsers.forEach(function(user){
				  			client.get("username",function(error,name){
				  				 if(name == user){
				  					 client.emit("game_user_already_logged");
				  					 disconnected = true;
				  					
				  				 }
				  			});
				  		});
				  		if(!disconnected){
				  		client.set("username",data);
				  		gameOnlineUsers.push(data);
				  		client.broadcast.emit("game_online_users",JSON.stringify(gameOnlineUsers));
				  		
				  		}   
				// } 
				 
			// });
				
			});
			
			client.on("get_game_online_users",function(){
				 client.emit("game_online_users",JSON.stringify(gameOnlineUsers));
			});
			
			client.on("challenge",function(data){
				//client.get("socialhub_active",function(error,socialhub_active){
				//      if(socialhub_active=="true"){
				    	  client.broadcast.emit("challenge_request",data);
				// }
			//});
			
		  });
			
		 client.on("accept_request",function(data){
			// client.get("socialhub_active",function(error,socialhub_active){
			   //   if(socialhub_active=="true"){
			    	  client.broadcast.emit("user_accepted",data); 
			    	  
			      //	}
			 	//});
			 
		 	});	
		 
		 	client.on("decline_request",function(data){
			 //client.get("socialhub_active",function(error,socialhub_active){
			    //  if(socialhub_active=="true"){
			    	  client.broadcast.emit("user_declined",data);
			    //  }
			  // });
		  	});
		 	
		 	client.on("in_a_game",function(data){
		 		client.broadcast.emit("in_a_game",data);
		 		console.log("in a game "+data);
		 		
		 	});
		   
		 	client.on("make_move",function(data){
		 		client.broadcast.emit("move_made",data);
		 		
		 	});
		 	
		 	client.on("end_game",function(data){
		 		client.broadcast.emit("game_ended",data);

		 	});
		 	
		 	client.on("disconnect",function(){
				//client.get("socialhub_active",function(error,socialhub_active){
					//if(socialhub_active){
						client.get("username",function(error,name){
							gameOnlineUsers = xo.removeUser(gameOnlineUsers,name);
							client.broadcast.emit("game_online_users",JSON.stringify(gameOnlineUsers));
							client.broadcast.emit("game_player_logged_out",name);
						});
					//}
				//});
			});
			
			
		});
		
	
	
	
	
	
	
	
	
}


exports.init = init; 