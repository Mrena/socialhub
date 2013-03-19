// socialhub

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
 	
 	
 	exports.isUserOnline = isUserOnline;
 	exports.removeUser = removeUser;