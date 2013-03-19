var app = require("http").createServer(handler);
var io = require("./socket.io/lib/socket.io").listen(app);
var fs = require("fs");
var url = require("url");


app.listen(8000);

function handler(request,response){
	
	var pathname = url.parse(request.url).pathname;
	
	switch(pathname){
	case "/index.html": route(pathname,response);
		break;
	case "/game.html" : route(pathname,response);
	    break;
	case "/chat.html" : route(pathname,response);
		break;
	
	}
}


function route(pathname,response){
	fs.readFile(__dirname+""+pathname,function(error,data){
		if(error){
			response.writeHead(404);
		    response.end("Page not found");
		}else{
			response.writeHead(200,{"Content-Type" : "text/html"});
			response.write(data);
		}
		
	});
	
	
}
    var users = Array("","");
    var onlineUsers =  Array();
    var gameOnlineUsers = Array();
    var lastFiveMessages = new Array();
	var count = 0;
	var color = "";
	var smileys = Array("/icons/home.png","/icons/smile.png","/icons/heart.png");
	
	io.sockets.on("connection",function(client){

		client.on("register",function(data){
			var taken = false;
			for(var i=0;i<users.length;i++){
			if(data.Name==users[i]){
				taken = true;
				break;
			}
			
		}
			if(taken){
				client.emit("username_taken",data.Name);
			}else{
				client.emit("registered",data);
				}
		});
	
	
	client.on("messageAll",function(data){
	  client.get("socialhub_active",function(error,socialhub_active){
		  if(socialhub_active=="true"){
			 color = getRandomColor();
			 lastFiveMessages.push("<span style='color:"+color+"'>"+data.Name+" : "+data.Message+"</span>");
				if(lastFiveMessages.length==6){
					lastFiveMessages.shift();
				}
			   var re = /love/g;
			   data.Message.replace(re,"<img src='"+__dirname+""+smileys[2]+"' alt='love' />");	
			   color = getRandomColor();	
			   client.broadcast.emit("messages",{"Name" : data.Name, "Message" : "<span style='color:"+color+"'>"+data.Message+"</span>"});
			   console.log(count++);
		 }
		 
	 });
		
	 
   });
    
    
	client.on("join",function(data){
	 client.get("socialhub_active",function(error,socialhub_active){
		 if(socialhub_active=="true"){
		 var disconnected = false;
			onlineUsers.forEach(function(user){
				client.get("username",function(error,name){
					 if(name == user){
						 client.emit("user_already_logged");
						 disconnected = true;
					 }
				});
			});
			if(!disconnected){
			client.set("username",data);
			onlineUsers.push(data);
			client.emit("online_users",JSON.stringify(onlineUsers));
			client.emit("last_five_messages",JSON.stringify(lastFiveMessages));
			color = getRandomColor();
			client.broadcast.emit("join_message","<span style='color:"+color+"'>"+data+" has joined.</span>");
			}
			
		 }
	 });	
});
	
	client.on("get_online_users",function(){
		client.emit("online_users",JSON.stringify(onlineUsers));
		
	});
	
	client.on("turn_socialhub_off",function(){
		client.set("socialhub_active","false");
		color = getRandomColor();
		client.broadcast.emit("left_message","<span style='color:"+color+"'>"+name+" has left the building.</span>");
		});
	
	client.on("turn_socialhub_on",function(){
		client.set("socialhub_active","true");
		});
	
	client.on("disconnect",function(){
		client.get("socialhub_active",function(error,socialhub_active){
			if(socialhub_active){
				client.get("username",function(error,name){
					removeUser(name);
					color = getRandomColor();
					client.broadcast.emit("left_message","<span style='color:"+color+"'>"+name+" has left the building.</span>");
					client.broadcast.emit("game_online_users",JSON.stringify(onlineUsers));
					client.broadcast.emit("game_player_logged_out",name);
				});
			}
		});
});
	
	
	
	// game logic
	
	client.on("join_game",function(data){
	 client.get("socialhub_active",function(error,socialhub_active){
		      if(socialhub_active=="true"){
		    	  var disconnected = false;
		  		  onlineUsers.forEach(function(user){
		  			client.get("username",function(error,name){
		  				 if(name == user){
		  					 client.emit("game_user_already_logged");
		  					 disconnected = true;
		  					
		  				 }
		  			});
		  		});
		  		if(!disconnected){
		  		client.set("username",data);
		  		onlineUsers.push(data);
		  		client.broadcast.emit("game_online_users",JSON.stringify(onlineUsers));
		  		//onlineUsers.push(data);	
		  		
		  		}   
		 } 
		 
	 });
		
	});
	
	client.on("get_game_online_users",function(){
		 client.emit("game_online_users",JSON.stringify(onlineUsers));
		 console.log("game online users emitted");
	});
	
	client.on("challenge",function(data){
		client.get("socialhub_active",function(error,socialhub_active){
		      if(socialhub_active=="true"){
		    	  client.broadcast.emit("challenge_request",data);
		 }
	});
	
  });
	
 client.on("accept_request",function(data){
	 client.get("socialhub_active",function(error,socialhub_active){
	      if(socialhub_active=="true"){
	    	  client.broadcast.emit("user_accepted",data); 
	    	  
	      	}
	 	});
	 
 	});	
 
 	client.on("decline_request",function(data){
	 client.get("socialhub_active",function(error,socialhub_active){
	      if(socialhub_active=="true"){
	    	  client.broadcast.emit("user_declined",data);
	      }
	   });
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
 
 });
	
	
 	var colors = Array("red","orange","yellow","purple","silver","blue","teal","pink","lime");
 	var getRandomColor = function(){
	var randNum = Math.floor(Math.random()*colors.length);
	return colors[randNum];
	 
 	}
 
 	var tempOnlineUsers = Array();
 	var removeUser = function(user){
	// empty tempOnlineUsers
	tempOnlineUsers.length = 0;
	onlineUsers.forEach(function(onlineUser){
		if(onlineUser!=user){
			   tempOnlineUsers.push(onlineUser);
				}
	});
		onlineUsers = tempOnlineUsers;
	
 	}
 	
 	var isOnline;
 	var isUserOnline = function(user){
 		isOnline = false;
 		onlineUsers.forEach(function(onlineUser){
 			if(onlineUser==user){
 				isOnline = true;
 			}
 			
 		});
 		return isOnline;
 	}
 