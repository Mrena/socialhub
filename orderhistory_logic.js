

var order = function(client,fs){
	
	client.on("get_order_history",function(){
		
		 fs.readFile("./web_content/orderhistory.txt",'utf8',function(error,content){
			if(error)
				throw error;
			
			client.emit("order_history",content);
			
		});
	});
	
	
	
	
};

exports.order = order;

