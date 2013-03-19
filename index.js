var app = require("http").createServer(handler);
var io = require("./socket.io/lib/socket.io").listen(app);
var fs = require("fs");
var url = require("url");


app.listen(8000);

function handler(request,response){
	
	var pathname = url.parse(request.url).pathname;
	
	switch(pathname){
	case "/home.html": route(pathname,response);
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
    
	var xo = require("./js/xo");
	var chat = require("./js/chat");
	xo.init(io);
	chat.init(io);
	
	
	