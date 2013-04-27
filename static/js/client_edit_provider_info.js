

	var client_edit_provider_info = function(socket){
	
		
		
		try{
		
		var validateEditInfo = function(f_name,l_name,password,email_address,physical_address){
			
			var isValid = true;
			
			var validate_f_name = /^[a-z]([0-9a-z])+$/i;
			if( !(validate_f_name.test(f_name))){
					$("#f_name_error").html("Please enter a valid first name. Your first name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
					$("#f_name").val("");
					isValid = false;	
			}
			
			var validate_l_name = /^[a-z]([0-9a-z])+$/i;
			if( (!validate_l_name.test(l_name))){
					$("#l_name_error").html("Please enter a valid last name. Your last name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
					$("#l_name").val("");
					isValid = false;
			}
			
			var validate_password = /^[a-z]([0-9a-z_])+$/i;
			if( (!validate_password.test(password))){
						$("#password_error").html("Please enter a valid password. Your password should not contain special characters, and needs to be greater than 4 and less than 10 characters.");
						$("#password").val("");
						isValid = false;
			}
			
			var validate_email_address = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
			if(!(validate_email_address.test(email_address))){
					$("#email_address_error").html("Please enter a valid email address.");
					$("#email_address").val("");
					isValid = false;
				
			}
			
			if(physical_address==""){
				$("#physical_address_error").html("Please enter a valid physical address. Your physical address should not contain special characters, and needs to be greater than 5 and less than 40 characters.");
				$("#physical_address").val("");
				isValid = false;
			}
			
			
		return isValid;
			
		};
		
		
		var attachListeners = function(){
			
			$("#update_provider").on("click",function(e){
				$(".error").empty();
				
				   var f_name = $.trim($("#f_name").val()),
				       l_name = $.trim($("#l_name").val()),
				       password = $.trim($("#password").val()),
				       email_address = $.trim($("#email_address").val()),
				       physical_address = $.trim($("#physical_address").val());
				       
					if(validateEditInfo(f_name,l_name,password,email_address,physical_address)){
						
						var providerInfo = {
								"f_name" : f_name,
								"l_name" : l_name,
								"username" : sessionStorage['logged_as'],
								"password" : password,
								"email_address" : email_address,
								"physical_address" : physical_address
						};
						
						socket.emit("submit_edit_provider",JSON.stringify(providerInfo));
						console.log(JSON.stringify(providerInfo));
						$("#f_name").val("");
						$("#l_name").val("");
						$("#password").val("");
						$("#email_address").val("");
						$("#physical_address").val("");
						
						
					}else{
						
						console.log("provider not submitted");
					}
				
				e.preventDefault();
			});
			
		};
		
		
		$(".edit_provider_info").on("click",function(e){
			
			socket.emit("get_edit_provider_info_page");
			sessionStorage['current_view'] = "edit_provider_info_page";
			
			e.preventDefault();
		});
		
		socket.on("edit_provider_info_page",function(data){
			if(sessionStorage['current_view'] === "edit_provider_info_page"){
				
				$("#content").html(data);
				socket.emit("get_service_provider_edit_info",sessionStorage['logged_as']);
				
			}
				
		});
		
		
		socket.on("service_provider_info",function(objProvider){
			
			if(sessionStorage['current_view'] === "edit_provider_info_page"){
			
				objProvider = JSON.parse(objProvider);
				console.log(objProvider);
				$("#f_name").val(objProvider.f_name);
				$("#l_name").val(objProvider.l_name);
				$("#password").val(objProvider.password);
				$("#email_address").val(objProvider.email_address);
				$("#physical_address").val(objProvider.physical_address);
			
				if(localStorage['listener_attached'] !== "provider_edit_info"){
					attachListeners();
					localStorage['listener_attached'] = "provider_edit_info";
				}
			
			}
			
		});
		
		socket.on("provider_edit_success",function(){
			
			$("#update_notification").text("Your details has been successfully updated");
			console.log("success");
			
		});
		
		socket.on("provider_edit_error",function(){
			
			$("#update_notification").html("We could not update your details. Please try again later");
			
		});
		
	}catch(error){
			
			console.log(error);
			
			var objError = {
					"error" : error.message,
					"file_name" : "client_edit_provider_info.js",
					"line_number" : 1
			};
			
			socket.emit("log_system_error",JSON.stringify(objError));
			
		}
		
	
	};