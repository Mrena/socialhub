

var client_printco = function(socket){
	
	try{
	
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
	var username,password;
	var attachListeners = function(){
		
		$("#login_submit").on("click",function(e){
			
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
				
				socket.emit("validate_service_provider",JSON.stringify(objProvider));
				
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
		
		
	};
	
	
	socket.on("new_catcha_image",function(objImage){
		
		objImage = JSON.parse(objImage);
		$("#login_catcha").html("<img src='+"+objImage.image_data+"' alt='Catcha' />");
		localStorage['catcha_image_combination'] = objImage.combination;

	});
	
	// start of printco request and response
	$("#printco").on("click",function(e){
		socket.emit("get_printco");
		sessionStorage['current_view'] = "prico_page";
		e.preventDefault();
		
	});
	
	socket.on("printco",function(data){
		
		if(sessionStorage['current_view'] == "prico_page"){
			$("#page").html(data);
			attachListeners();
			
		}
			
	});
	
	// end of printco request and response
	

	socket.on("service_provider_validated",function(validated){
		
		validated = JSON.parse(validated);
		if(validated.isValid){
			
			socket.emit("get_service_provider_page");
			sessionStorage['logged_as'] = username;
			
		}else{
			
			var $login_error = $("#login_error");
			$login_error.text("Incorrect username or password.");
			
			$("#login_username").val("");
			$("#login_password").val("");
			$("#catcha_input").val("");
			
			setTimeout(function(){
				$login_error.empty();
			},3000);
		}
	});
	
	socket.on("service_provider_page",function(content){
		
		
		$("html").fadeOut("slow",function(){
			$(this).html(content);
			$(this).fadeIn();
		});
		
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_printco_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
};
