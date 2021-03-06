


	var client_admin = function(socket){
	
		var validateLogin = function(username,password,catcha){
			var isValid = true;
			
			var validate_username = /^[a-z]([0-9a-z_])+$/i;
			if( (!validate_username.test(username))){
				$("#login_username_error").html("Invalid username.");
				$("#login_username").val("");
				isValid = false;
		
				}
			
			var validate_password = /^[a-z]([0-9a-z_])+$/i;
			if( (!validate_password.test(password))){
				$("#login_password_error").html("Invalid password.");
				$("#login_password").val("");
				isValid = false;
				}
			
			var validate_catcha = /^[a-z]([0-9a-z_])+$/i;
			if( (!validate_catcha.test(password))){
				$("#login_catcha_error").html("Incorrect combination.");
				$("#login_catcha").val("");
				isValid = false;
				}
			
			return isValid;
		};
		
		var generateCatcha = function(){
			
			// generate a new catcha image
			socket.emit("get_new_catcha");
			
		}();
		var username,password;
		
		
		
	  $("#admin_login_submit").on("click",function(){
		  
		    $("#login_username_error").empty();
			$("#login_password_error").empty();
			$("#login_catcha_error").empty();
			
			 username = $.trim($("#login_username").val()),
				password = $.trim($("#login_password").val());
			
			if(validateLogin(username,password)){
				var objProvider = {
						"username" : username,
						"password" : password
				};
				
				socket.emit("validate_admin",JSON.stringify(objProvider));
				
			}else{
				
				var $login_error = $("#login_error");
				$login_error.text("Incorrect username or password.");
				generateCatcha();
				setTimeout(function(){
					$login_error.empty();
				},3000);
			}
			
			e.preventDefault();
		});
		  
		  
		  
	  socket.on("new_catcha_image",function(objImage){
			
			objImage = JSON.parse(objImage);
			$("#login_catcha").html("<img src='+"+objImage.image_data+"' alt='Catcha' />");
			localStorage['catcha_image_combination'] = objImage.combination;

		});
	
	
	
	
	
	};