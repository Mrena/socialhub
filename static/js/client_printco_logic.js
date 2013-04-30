

var client_printco = function(socket){
	
	try{
		
	var displayCatchaError = function(){
		
		$("#login_catcha_error").html("Incorrect combination.");
		$("#catcha_input").val("");
		setTimeout(function(){
			$("#login_catcha_error").empty();
		},3000);
		
	};
	
	var displayLoginError = function(){
		
		$("#login_error").text("Incorrect username or password.");
		$("#login_username").text("");
		$("#login_password").text("");
		setTimeout(function(){
			$("#login_error").empty();
		},3000);
		
	};
	
	var validateLogin = function(username,password,catcha_value){
		var isValid = true;
		
		var validate_username = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_username.test(username))){
			displayLoginError();
			isValid = false;
	
			}
		
		var validate_password = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_password.test(password))){
			displayLoginError();
			isValid = false;
			}
		
	
		var validate_catcha = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_catcha.test(catcha_value))){
			displayCatchaError();
			isValid = false;
			}
		
		console.log(catcha_value);
		if(catcha_value!=sessionStorage['catcha_value'].toString()){
			displayCatchaError();
			isValid = false;
		}
		
		return isValid;
	};
	

	var username,password;
	var attachListeners = function(){
		
		$("#refresh_catcha").on("click",function(e){
			e.preventDefault();
			$("#catcha").trigger("generate_new_catcha");
		});
		
		$("#catcha").on("generate_new_catcha",function(e){
			e.stopPropagation();
			socket.emit("generate_new_catcha");
			
		}).trigger("generate_new_catcha");
		
		
		$("#login_submit").on("click",function(e){
			
			e.preventDefault();
			
			$("#login_username_error").empty();
			$("#login_password_error").empty();
			$("#login_catcha_error").empty();
			
			 	username = $.trim($("#login_username").val()),
				password = $.trim($("#login_password").val());
				catcha = $.trim($("#catcha_input").val());
			
			if(validateLogin(username,password,catcha)){
				var objProvider = {
						"username" : username,
						"password" : password
				};
				
				socket.emit("validate_service_provider",JSON.stringify(objProvider));
				
			}else{
				
				$("#catcha").trigger("generate_new_catcha");
				
			}
			
		});
	
	};
	
	
	socket.on("new_catcha_image",function(objImage){
		
		objImage = JSON.parse(objImage);
		$("#catcha").html("<img src='"+objImage.catcha_image+"' alt='Catcha' />");
		sessionStorage['catcha_value'] = objImage.catcha_value;

	});
	
	socket.on("new_catcha_image_error",function(){
		
		console.log('ERROR: generating new catcha');
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
