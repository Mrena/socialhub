
// chat 

var init = function(io){
	
	var users = Array("","");
	var onlineUsers = new Array();
	var lastFiveMessages = new Array();
	var count = 0;
	var color = "";
	var smileys = Array("/icons/home.png","/icons/smile.png","/icons/heart.png");
	var global_chat = require("./global_chat_logic.js");
	
  var chat = io.of('/chat').on("connection",function(client){

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
			 color = global_chat.getRandomColor();
			 lastFiveMessages.push("<span style='color:"+color+"'>"+data.Name+" : "+data.Message+"</span>");
				if(lastFiveMessages.length==6){
					lastFiveMessages.shift();
				}
			   var re = /love/g;
			   data.Message.replace(re,"<img src='"+__dirname+""+smileys[2]+"' alt='love' />");	
			   color = global_chat.getRandomColor();	
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
			color = global_chat.getRandomColor();
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
		color = global_chat.getRandomColor();
		client.broadcast.emit("left_message","<span style='color:"+color+"'>"+name+" has left the building.</span>");
		});
	
	client.on("turn_socialhub_on",function(){
		client.set("socialhub_active","true");
		});
	
	client.on("disconnect",function(){
		client.get("socialhub_active",function(error,socialhub_active){
			if(socialhub_active){
				client.get("username",function(error,name){
					onlineUsers = global_chat.removeUser(onlineUsers,name);
					color = global_chat.getRandomColor();
					client.broadcast.emit("left_message","<span style='color:"+color+"'>"+name+" has left the building.</span>");
				});
			}
		});
	});
	
 });

	
}


exports.init = init;