
	var express = require("express");
	var expressApp = express();
	var app = require("http").createServer(expressApp);
	var io = require("socket.io/lib/socket.io").listen(app);
	var fs = require("fs");
	var url = require("url");

	expressApp.use('/static',express.static(__dirname+"/static"));
	app.listen(8000);


	expressApp.get("/game.html",function(request,response){
	
		handler(request,response);
		
	
	});
	
	expressApp.get("/startup.html",function(request,response){
		handler(request,response);
	});
	
	function handler(request,response){
	
		var pathname = url.parse(request.url).pathname;
	
		switch(pathname){
		case "/home.html": route(pathname,response);
			break;
		case "/game.html" : route(pathname,response);
	    	break;
		case "/chat.html" : route(pathname,response);
			break;
		case "/startup.html" : route(pathname,response);
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
				response.end();
			}
		
	});
	
	
}
	
	io.sockets.on("connection",function(client){
		console.log("PrintP connected!!!");
		
		require("./orderhistory_logic").order(client,fs);
		require("./contact_logic").contact(client,fs);
		require("./home_logic").home(client,fs);
		require("./about_logic").about(client,fs);
		require("./printco_logic").print(client,fs);
		require("./terms_logic").terms(client,fs);
		require("./startup_logic").startup(client,fs);
		require("./js/providers_logic").providers(client,fs);
		
		
		
	});
	
	