

var client_all_catcha = function(socket){
	
	
	var attachListeners = function(catcha_ids){
		
		  var getRowNumber = function($that){
			  
			  var button_id = $that.attr("id"),
			    row_number = button_id.substr(button_id.lastIndexOf('_')+1);
			  
			  return row_number;
			  
		  },
		  validateCatchaInfo = function(catcha_name,catcha_value,row_number){
			  
			  var isValid = true;
				
				var validate_catcha_name = /^[0-9a-z]+$/i;
				if( !(validate_catcha_name.test(catcha_name))){
						$("#catcha_row_"+row_number+" td").eq(1).css({"background":"red","opacity":0.5});
						isValid = false;	
				}
				
				var validate_catcha_value = /^[0-9a-z]+$/i;
				if( (!validate_catcha_value.test(catcha_value))){
						$("#catcha_row_"+row_number+" td").eq(2).css({"background":"red","opacity":0.5});
						isValid = false;
				}
				
			  
			 return isValid; 
		  };
		
		
			$(".delete_catcha").on("click",function(e){
				
				   var row_number = getRowNumber($(this)),
				       catcha_id = $("#catcha_row_"+row_number+" td").eq(0).html();
				    
				    socket.emit("delete_catcha_image",catcha_id);
				    
			 e.preventDefault();
			});
			
			$(".edit_catcha").on("click",function(e){
			
				var row_number = getRowNumber($(this)),
				    catcha_name = $("#catcha_row_"+row_number+" td").eq(1).html(),
				    catcha_value = $("#catcha_row_"+row_number+" td").eq(2).html();
				
					$("#catcha_row_"+row_number+" td").eq(1).html("<input type='text' id='name_input_"+row_number+"' value='"+catcha_name+"' class='ui-body-d ui-shadow-inset' />");
					$("#catcha_row_"+row_number+" td").eq(2).html("<input type='text' id='value_input_"+row_number+"' value='"+catcha_value+"' class='ui-body-d ui-shadow-inset' />");
					
					$(this).hide();
					$("#edit_catcha_image_"+row_number).hide();
					$("#delete_catcha_"+row_number).hide();
					$("#submit_catcha_"+row_number).show();
			 e.preventDefault();
			});
			
			$(".submit_catcha").on("click",function(e){
				
				var row_number = getRowNumber($(this)),
				    catcha_name = $("#name_input_"+row_number).val(),
				    catcha_value = $("#value_input_"+row_number).val(),
				    catcha_id = $("#catcha_row_"+row_number+" td").eq(0).html();
				
				if(validateCatchaInfo(catcha_name,catcha_value,row_number)){
					
					var objCatchaInfo = {
							"catcha_name" : catcha_name,
							"catcha_value" : catcha_value,
							"catcha_id" : catcha_id
							
					};
					
					socket.emit("update_catcha_info",JSON.stringify(objCatchaInfo));
					
				}
				
				e.preventDefault();
			});
			
			$(".edit_catcha_image").on("click",function(e){
				
				var row_number = getRowNumber($(this)),
			    catcha_name = $("#catcha_row_"+row_number+" td").eq(1).html(),
			    catcha_value = $("#catcha_row_"+row_number+" td").eq(2).html(),
			    catcha_id = $("#catcha_row_"+row_number+" td").eq(0).html(),
			    catcha_image_data = $("#catcha_row_"+row_number+" td").eq(3).find("img").attr("src");
				
				console.log(catcha_name,catcha_value,catcha_id,catcha_image_data);
				
				e.preventDefault();
			});
			
	};
	
	$catcha_manager_content = $("#catcha_manager_content");
	socket.emit("get_all_catcha_images");
	
	
	socket.on("all_catcha_images",function(objCatchaImages){
		
		objCatchaImages = JSON.parse(objCatchaImages);
		
		
		$catcha_manager_content.html("<div id='all_catcha_notification' class='ui-state-highlight'></div><table id='catcha_image_viewer' border='1'><thead><tr><td>Catcha Id</td><td>Name</td><td>Value</td><td>Image</td><td>Operactions</td></tr></thead></table>");
		var catcha_images = [],
		    count = 0;
		objCatchaImages.forEach(function(catchaImage){
			
			catcha_images.push("<tr id='catcha_row_"+(count)+"'><td>"+catchaImage.catcha_id+"</td><td>"+catchaImage.catcha_name+"</td><td>"+catchaImage.catcha_value+"</td><td><img src='"+catchaImage.catcha_image+"' alt='Catcha Image' /></td><td id='catcha_ops_"+(count)+"'><button class='delete_catcha' id='delete_catcha_"+(count)+"'>Delete</button><button class='edit_catcha' id='edit_catcha_"+(count)+"'>Edit</button><button style='display:none' class='submit_catcha' id='submit_catcha_"+(count)+"'>Submit</button><button class='edit_catcha_image' id='edit_catcha_image_"+(count)+"'>Edit Image</button></td></tr>");
			++count;
			
		});
		
		$("#catcha_image_viewer").append(catcha_images.join(''));
		attachListeners();
		
		
	});
	
	socket.on("get_all_catcha_images_error",function(){
		
		$catcha_manager_content.html("Could not retrieve catcha images");
		
	});
	
	socket.on("update_catcha_info_error",function(){
		
		$all_catcha_notification = $("#all_catcha_notification");
		$all_catcha_notification.html("Could not update catcha info.");
		setTimeout(function(){
			$all_catcha_notification.empty();
		},3000);
		
	});
	
	socket.on("delete_catcha_image_error",function(){
		
		$all_catcha_notification = $("#all_catcha_notification");
		$all_catcha_notification.html("Could not delete catcha image.");
		setTimeout(function(){
			$all_catcha_notification.empty();
		},3000);
		
	});
	
	
	
	
	
};