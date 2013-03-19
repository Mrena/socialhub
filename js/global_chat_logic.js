//  global_chat_logic
    var socialhub = require("./socialhub");

	
	var colors = Array("red","orange","yellow","purple","silver","blue","teal","pink","lime");
 	var getRandomColor = function(){
	var randNum = Math.floor(Math.random()*colors.length);
	return colors[randNum];
 	}
 
 	
 	
 	
 	exports.removeUser = socialhub.removeUser;
 	exports.getRandomColor = getRandomColor;