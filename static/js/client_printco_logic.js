

var client_printco = function(socket){
	
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
		
	};
	
	var attachListeners = function(){
		
		$("#login_submit").on("click",function(e){
			console.log("submit clicked");
			$("#login_username_error").html("");
			$("#login_password_error").html("");
			$("#login_catcha_error").html("");
			
			var username = $.trim($("#login_username").val()),
				password = $.trim($("#login_password").val());
			
			if(validateLogin(username,password)){
				var objProvider = {
						"username" : username,
						"password" : password
				};
				
				socket.emit("validate_service_provider",JSON.stringify(objProvider));
				
			}else{
				
				var $login_error = $("#login_error");
				$login_error.html("Incorrect username or password.");
				generateCatcha();
				setTimeout(function(){
					$login_error.html("");
				},3000);
			}
			
			e.preventDefault();
		});
		
		
	};
	
	
	socket.on("new_catcha_image",function(objImage){
		
		objImage = JSON.parse(objImage);
		$("#login_catcha").html("<img src='+"+objImage.image_data+"' alt='Catcha' />");
		localStorage['catcha_image_combination'] = objImage.combination;

	});
	
	// start of printco request and response
	$("#printco").on("click",function(e){
		socket.emit("get_printco");
		e.preventDefault();
		
	});
	
	socket.on("printco",function(data){
		
		$("#menu").hide();
		$("#page").fadeOut("slow",function(){
			$("#page").html(data);
			attachListeners();
			$("#page").fadeIn();
			$("#menu").show("slow");
		});
		
	});
	
	// end of printco request and response
	

	socket.on("service_provider_validated",function(validated){
		
		validated = JSON.parse(validated);
		if(validated.isValid){
			
			socket.emit("get_service_provider_page");
			//window.location.href = "localhost:8000/provider.html";
			
		}else{
			
			var $login_error = $("#login_error");
			$login_error.html("Incorrect username or password.");
			
			$("#login_username").val("");
			$("#login_password").val("");
			$("#catcha_input").val("");
			
			setTimeout(function(){
				$login_error.html("");
			},3000);
		}
	});
	
	socket.on("service_provider_page",function(content){
		
		$("html").html(content);
		console.log("Content added");
		
	});
	
};
