// socialhub

	var fs = require("fs");

	var isOnline;
 	var isUserOnline = function(onlineUsers,user){
 		isOnline = false;
 		onlineUsers.forEach(function(onlineUser){
 			if(onlineUser==user){
 				isOnline = true;
 			}
 			
 		});
 		return isOnline;
 	}
 	
 	
 	var tempOnlineUsers = Array();
 	var removeUser = function(onlineUsers,user){
	// empty tempOnlineUsers
	tempOnlineUsers.length = 0;
	onlineUsers.forEach(function(onlineUser){
		if(onlineUser!=user){
			   tempOnlineUsers.push(onlineUser);
				}
	});
		onlineUsers = tempOnlineUsers;
		return onlineUsers;
 	}
 	
 	
 	var colors = Array("red","orange","yellow","purple","silver","blue","teal","pink","lime");
 	var getRandomColor = function(){
	var randNum = Math.floor(Math.random()*colors.length);
	return colors[randNum];
 	}
 	
 	var images = Array();
 	var getImages = function(){
 		
 		images[0] = fs.readFileSync("../SocialHub/images/mazes.jpg");
 		
 		return images[0].toString();
 	}
 	
 	
 	exports.isUserOnline = isUserOnline;
 	exports.removeUser = removeUser;
 	exports.getRandomColor = getRandomColor;
 	exports.getImages = getImages;