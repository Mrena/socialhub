

var client_contact = function(socket){
	
	try{
		
		
		var validate = function(name,email_address,phone_number,comment){
			
			
				var isValid = true;
				
				var validate_name = /^[a-z]([0-9a-z])+$/i;
				if( !(validate_name.test(name))){
						$("#name_error").html("Please enter a valid name. Your name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
						$("#name").val("");
						isValid = false;	
				}
				
				var validate_phone_number = /^[0-9]+$/i;
				if( (!validate_phone_number.test(phone_number))){
						$("#phone_number_error").html("Please enter a valid phone number.");
						$("#phone_number").val("");
						isValid = false;
				}
				
				
				var validate_email_address = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
				if(!(validate_email_address.test(email_address))){
						$("#email_address_error").html("Please enter a valid email address.");
						$("#email_address").val("");
						isValid = false;
					
				}
				
				if(!comment){
					
					$("#comment_error").html("Please enter a valid comment.");
					$("#comment").val("");
					isValid = false;
					
				}
				
				
				
			return isValid;
				
			
			
		};
		
		var attachListeners = function(){
			
			
			$("#send_comment").on("click",function(e){
				
				var name = $("#name").val(),
				    email_address = $("#email_address"),
				    phone_number = $("phone_number"),
				    comment = $("#comment");
				
				if(validate(name,email_address,phone_number,comment)){
					
					var objComment = {
							"name" : name,
							"email_address" : email_address,
							"phone_number" : phone_number,
							"comment" : comment
							
					};
					
					socket.emit("send_comment",JSON.stringify(objComment));
					
				}
				
				e.preventDefault();
			});
			
		};
		
		
	socket.on("comment_sent",function(){
		
		$("#notification").text("Comment sent.");
		
	});	
	
	socket.on("comment_send_error",function(){
		
		console.log("Comment could not be sent");
		$("#notification").text("Comment could not be sent.");
		
	});
	
	// start of contact request and response
	$("#contact").on("click",function(e){
		socket.emit("get_contact");
		sessionStorage['current_view'] = "contact_page";
		e.preventDefault();
		
	});
	
	socket.on("contact",function(data){
		
		if(sessionStorage['current_view'] === "contact_page"){
			$("#page").html(data);
			if(sessionStorage['listener_attached'] !== "contact"){
				attachListeners();
				sessionStorage['listener_attached'] = "contact";
			}
		}
		
	});
	
	// end of contact request and response
	
	}catch(error){
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_contact_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
	
};
