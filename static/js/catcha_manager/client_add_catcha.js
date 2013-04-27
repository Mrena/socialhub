

var client_add_catcha = function(socket){
	
	
	
	var validateCatchaInfo = function(catcha_name,catcha_value,image_data){
		
		var isValid = true;
		
		var validate_catcha_name = /^[0-9a-z]+$/i;
		if( !(validate_catcha_name.test(catcha_name))){
				$("#catcha_name_error").html("Please enter a valid Catcha name.");
				$("#catcha_name").val("");
				isValid = false;	
		}
		
		var validate_catcha_value = /^[0-9a-z]+$/i;
		if( (!validate_catcha_value.test(catcha_value))){
				$("#catcha_value_error").html("Please enter a valid Catcha value.");
				$("#catcha_value").val("");
				isValid = false;
		}
		
		console.log(image_data.substr(5,5));
		if(image_data.substr(5,5)!="image"){
			isValid = false;
		}
		
	return isValid;
		
	};
	
	
	$("#catcha_image").on("change",function(e){
		
		var file = e.originalEvent.target.files[0],
		    reader = new FileReader();
		    
		reader.onload = function(e){
		 
		 image_data = e.target.result;
		 
		 if(image_data.substr(5,5)=="image"){
			 
			 $("#current_catcha").html("<img id='catcha' alt='Catcha Image'/>").find("#catcha").attr("src",e.target.result);
			 console.log(e.target.result+" length: "+(e.target.result).length);
		 
		 }else{
		 		$("#add_notification").text("Please upload an image.");
		 		setTimeout(function(){
		 			$("#add_notification").empty();
		 		},3000);
		 		
		 }
			
	};
		
		reader.readAsDataURL(file);
		
	});
	
	$("#submit_catcha_image").on("click",function(e){
		
		$("#catcha_name_error").empty();
		$("#catcha_value_error").empty();
		$("#catcha_image_error").empty();
		
		var catcha_name = $.trim($("#catcha_name").val()),
		    catcha_value = $.trim($("#catcha_value").val());
		
		if(validateCatchaInfo(catcha_name,catcha_value,image_data)){
			console.log(image_data);
			var objCatcha = {
					"catcha_name" : catcha_name,
					"catcha_value" : catcha_value,
					"image_data" : image_data
			};
			
			socket.emit("add_catcha_image",JSON.stringify(objCatcha));
			
			$("#catcha_name").val("");
			$("#catcha_value").val("");
			$("#catcha_image").val("");
			image_data = "";
			$("#current_catcha").empty();
			
			$("#add_notification").text("Catcha image sent");
			
		}
		
		e.preventDefault();
	});
	
	socket.on("catcha_image_added",function(){
		
		$("#add_notification").text("Catcha image added");
		setTimeout(function(){
			$("#add_notification").empty();
		},3000);
		
	});
	
	
	socket.on("add_catcha_image_error",function(e){
		
		$("#add_notification").text("Could not add catcha image. Please try again later.");
		setTimeout(function(){
			$("#add_notification").empty();
		},3000);
		
	   e.preventDefault();
	});
	
};