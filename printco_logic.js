

var print = function(client,fs){
	
	client.on("get_printco",function(){
		
		 fs.readFile("./printco.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("printco",content);
			
		});
	});
	
	
	
};

exports.print = print;