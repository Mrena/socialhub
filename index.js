
	var express = require("express");
	var expressApp = express();
	var app = require("http").createServer(expressApp);
	var io = require("socket.io/lib/socket.io").listen(app);
	var fs = require("fs");
	var url = require("url");
	var mysql = require("mysql");
	var redis = require("redis");
	
	
	
	var mysql_con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		database : "printp"
			
	});
	
	var admin_mysql_con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		database : "mysql"
			
	});
	

	expressApp.use('/static',express.static(__dirname+"/static"));
	app.listen(8000);
	

	expressApp.get("/game.html",function(request,response){
	
		handler(request,response);
		
	
	});
	
	expressApp.get("/startup.html",function(request,response){
		handler(request,response);
	});
	
	expressApp.get("/provider.html",function(request,response){
		
		handler(request,response);
		
	});
	
	expressApp.get("/admin.html",function(request,response){
		
		handler(request,response);
		
	});
	
	expressApp.get("/*",function(request,response){
		
		pageNotFound(request,response);
		
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
		case "/provider.html" :  route(pathname,response);
		   break;
		case "/admin.html" : route(pathname,response);
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
	
function pageNotFound(request,response){
	
fs.readFile(__dirname+"/pagenotfound.html",function(error,data){
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
		
		
		require("./orderhistory_logic").order(client,mysql_con,fs);
		require("./contact_logic").contact(client,mysql_con,fs);
		require("./home_logic").home(client,mysql_con,fs);
		require("./about_logic").about(client,mysql_con,fs);
		require("./printco_logic").print(client,mysql_con,fs);
		require("./terms_logic").terms(client,mysql_con,fs);
		require("./startup_logic").startup(client,mysql_con,fs);
		require("./js/providers_logic").providers(client,mysql_con,fs);
		require("./database_content_logic").database(client,mysql_con,fs);
		require("./add_provider_logic").provider(client,mysql_con,fs);
		require("./service_providers_logic").service_providers(client,mysql_con,fs);
		require("./web_content.js").web_content(client,mysql_con,fs);
		require("./js/system_errors").system_errors(client,mysql_con,fs);
		require("./js/end_users").end_users(client,mysql_con,fs);
		require("./js/data_access/watcher").watcher(client,mysql_con,fs);
		require("./js/startup_samples").startup_samples(client,mysql_con,fs);
		require("./js/startup_tables").startup_tables(client,mysql_con,fs);
		require("./js/messages").messages(client,mysql_con,fs);
		require("./js/admin").admin(client,mysql_con,admin_mysql_con,fs);
		require("./js/catcha_server").catcha_server(client,mysql_con,fs);
		
		
		
	});
	
	