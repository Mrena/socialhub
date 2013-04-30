

var client_contact = function(socket){
	
	try{
		
		var saveToLocal = function(objComment){
			
			sessionStorage['contact_details'] = JSON.stringify(objComment);
			
		};
		
		
		function Restore(){
			
			if(sessionStorage['contact_details']){
				var objDetails = JSON.parse(sessionStorage['contact_details']);
				$("#name").val(objDetails.name);
				$("#email_address").val(objDetails.email_address);
				$("#phone_number").val(objDetails.phone_number);
			}
			
		}
		
		var validate = function(name,surname,email_address,phone_number,comment){
			
				var isValid = true;
				var validate_name = /^[a-z]([0-9a-z])+$/i;
				if((validate_name.test(name))===false){
						$("#name_error").html("Please enter a valid name. Your name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
						$("#name").val("");
						isValid = false;	
				}
				
				var validate_surname = /^[a-z]([0-9a-z])+$/i;
				if((validate_surname.test(surname))===false){
						$("#name_error").html("Please enter a valid name. Your name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
						$("#name").val("");
						isValid = false;	
				}
				
				
				
				var validate_phone_number = /^[0-9]+$/i;
				if((validate_phone_number.test(parseInt(phone_number)))===false){
						$("#phone_number_error").html("Please enter a valid phone number.");
						$("#phone_number").val("");
						isValid = false;
				}
				
				
				var validate_email_address = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
				if((validate_email_address.test(email_address))===false){
						$("#email_address_error").html("Please enter a valid email address.");
						$("#email_address").val("");
						isValid = false;
					
				}
				
				if($.trim(comment)==""){
					
					$("#comment_error").html("Please enter a valid comment.");
					$("#comment").val("");
					isValid = false;
				}
				
			return isValid;
		};
		
		var attachListeners = function(){
			
			Restore();
			
			$("#send_comment").on("click",function(e){
					
					e.preventDefault();
				  $(".error").html("");
				
				var fullname = $.trim($("#name").val()),
				    email_address = $.trim($("#email_address").val()),
				    phone_number = $.trim($("#phone_number").val()),
				    comment = $.trim($("#comment").val()),
				    first_name = $.trim(fullname.substr(0,fullname.indexOf(' '))),
				    last_name = $.trim(fullname.substr(fullname.indexOf(' ')));
				
				
				console.log("Firstname name: "+first_name.name);
				console.log(first_name);
				console.log("-----");
				console.log(fullname,email_address,phone_number,comment);
				
				if(validate(first_name,last_name,email_address,phone_number,comment)){
					
					var objComment = {
							"name" : fullname,
							"email_address" : email_address,
							"phone_number" : phone_number,
							"comment" : comment
							
					};
					
					saveToLocal(objComment);
					
					
					socket.emit("send_comment",JSON.stringify(objComment));
					$("#notification").text("Sending...");
				}
				
			});
			
		};
		
		
	socket.on("comment_sent",function(){
		
		$("#notification").text("Comment sent.");
		$("#comment").val("");
		
	});	
	
	socket.on("comment_send_error",function(){
		
		console.log("Comment could not be sent");
		$("#notification").text("Comment could not be sent.");
		
	});
	
	// start of contact request and response
	$("#contact").on("click",function(e){
		e.preventDefault();
		
		socket.emit("get_contact");
		sessionStorage['current_view'] = "contact_page";
		
		
	});
	
	socket.on("contact",function(data){
		
		if(sessionStorage['current_view'] === "contact_page"){
			$("#page").html(data);
				attachListeners();
			
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
