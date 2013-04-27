	var startup_da_parent = require("./startup_da_parent");


	var addCatchaImage = function(client,mysql_con,fs,objCatcha){
	
			query = "INSERT INTO Catcha_Images(catcha_name,catcha_value,catcha_image) VALUES('"+objCatcha.catcha_name+"','"+objCatcha.catcha_value+"','"+objCatcha.image_data+"')";
			startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
				
				console.trace(error);
				var file_name = "catcha_server_da.js",
				line_number = 7;
				startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
				client.emit("add_catcha_image_error");
				
			},function(client){
				
				client.emit("catcha_image_added");
			
		 });
			
	};
	
	
	var getAllCatchaImages = function(client,mysql_con,fs){
		
		try{
		
		var query = "SELECT * FROM Catcha_Images";
		startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
			
			client.emit("get_all_catcha_images_error");
			
			console.trace(error);
			var file_name = "catcha_server_da.js",
			line_number = 148;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			
			
		},function(client,rows,fields){
			
			var catcha_images = Array();
	    	rows.forEach(function(row){
	    		console.log(row);
	    		catcha_images.push(row);
	    	
	    	});
	    	
	    	client.emit("all_catcha_images",JSON.stringify(catcha_images));
		});
		
		}catch(error){
			
			client.emit("get_all_catcha_images_error");
			// System error logging
			console.log(error);
			var file_name = "catcha_server_da.js",
			line_number = 213;
			startup_da_parent.logSystemError(client,error,file_name,line_number);
			
		}
		
	};
	
	var deleteCatchaImage = function(client,mysql_con,fs,catcha_id){
		
		try{
		
			var query = "DELETE FROM Catcha_Images WHERE catcha_id='"+catcha_id+"'";
			    startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    	
			    		client.emit("delete_catcha_image_error");
			    		console.trace(error);
			    		var file_name = "catcha_server_da.js",
			    		line_number = 69;
			    		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			    	
			    		},function(client){
			    			
			    			getAllCatchaImages(client,mysql_con,fs);
			    			
			    		});
			    
			}catch(error){
				
				client.emit("delete_catcha_image_error");
				// System error logging
				console.log(error);
				var file_name = "catcha_server_da.js",
				line_number = 78;
				startup_da_parent.logSystemError(client,error,file_name,line_number);
		} 
			    
			    
	};
	
	var updateCatchaInfo = function(client,mysql_con,fs,objCatchaInfo){
		
		try{
		
			var query = "UPDATE Catcha_Images SET catcha_name = '"+objCatchaInfo.catcha_name+"', catcha_value = '"+objCatchaInfo.catcha_value+"' WHERE catcha_id='"+objCatchaInfo.catcha_id+"'";
			    startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
			    	
			    		client.emit("update_catcha_info_error");
			    		console.trace(error);
			    		var file_name = "catcha_server_da.js",
			    		line_number = 69;
			    		startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
			    	
			    		},function(client){
			    			
			    			getAllCatchaImages(client,mysql_con,fs);
			    			
			    		});
			    
			}catch(error){
				
				client.emit("update_catcha_info_error");
				// System error logging
				console.log(error);
				var file_name = "catcha_server_da.js",
				line_number = 78;
				startup_da_parent.logSystemError(client,error,file_name,line_number);
		} 
			    
			    
	};




exports.addCatchaImage = addCatchaImage;
exports.getAllCatchaImages = getAllCatchaImages;
exports.deleteCatchaImage = deleteCatchaImage;
exports.updateCatchaInfo = updateCatchaInfo;

exports.logSystemError = startup_da_parent.logSystemError;