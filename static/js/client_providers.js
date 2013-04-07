

var client_providers = function(socket){
	
	var validateProviderInfo = function(f_name,l_name,username,password,email_address,physical_address,operating_area){
			var isValid = true;
			var validate_f_name = /^[a-z]([0-9a-z_])+$/i;
		if( !(validate_f_name.test(f_name))){
				$("#f_name_error").html("Please enter a valid first name. Your first name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
				$("#f_name").val("");
				isValid = false;	
		}
		
			var validate_l_name = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_l_name.test(l_name))){
				$("#l_name_error").html("Please enter a valid last name. Your last name should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
				$("#l_name").val("");
				isValid = false;
		}
		
			var validate_username = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_username.test(username))){
				$("#username_error").html("Please enter a valid username. Your username should not contain special characters, and needs to be greater than 3 and less than 16 characters.");
				$("#username").val("");
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
		
			var validate_operating_area = /^[a-z]([0-9a-z_])+$/i;
		if( (!validate_operating_area.test(operating_area)) && (operating_area.length > 3 && operating_area.length < 15)){
				$("#operating_area_error").html("Please enter a valid operating area. Your operating area should not contain special characters, and needs to be greater than 5 and less than 15 characters.");
				$("#operating_area").val("");
				isValid = false;
		}
		
		return isValid;
	};
	
	if(localStorage["tables"]){
		var tables = JSON.parse(localStorage['tables']);
			if(tables.photographers_created=="No"){
				$("#get_service_providers").attr("disabled","disabled");
			}
	}
	
	
	$("#get_service_providers").on("click",function(e){
		socket.emit("get_printing_providers");
		e.preventDefault();
	});
	
	
	socket.on("printing_providers",function(providers){
		providers = JSON.parse(providers);
		console.log(providers[0].f_name);
		var pros = "<table border='1'><thead><tr><td>First Name</td><td>Last Name</td><td>Username</td><td>Email Address</td><td>Physical Address</td><td>Operating Area</td></tr></thead><tbody>";
		
		providers.forEach(function(provider){
			pros+="<tr><td>"+provider.f_name+"</td><td>"+provider.l_name+"</td><td>"+provider.username+"</td><td>"+provider.email_address+"</td><td>"+provider.physical_address+"</td><td>"+provider.operating_area+"</td></tr>";
		});
		
		pros += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#providers").html(pros);
		
	});
	
	
	$("#submit_provider").on("click",function(e){
		$(".error").html("");
		
		   var f_name = $.trim($("#f_name").val()),
		       l_name = $.trim($("#l_name").val()),
		       username = $.trim($("#username").val()),
		       password = $.trim($("#password").val()),
		       email_address = $.trim($("#email_address").val()),
		       physical_address = $.trim($("#physical_address").val()),
		       operating_area = $.trim($("#operating_area").val());
		       
			if(validateProviderInfo(f_name,l_name,username,password,email_address,physical_address,operating_area)){
				
				var providerInfo = {
						"f_name" : f_name,
						"l_name" : l_name,
						"username" : username,
						"password" : password,
						"email_address" : email_address,
						"physical_address" : physical_address,
						"operating_area" : operating_area
				};
				
				socket.emit("submit_provider",JSON.stringify(providerInfo));
				
				$("#f_name").val("");
				$("#l_name").val("");
				$("#username").val("");
				$("#password").val("");
				$("#email_address").val("");
				$("#physical_address").val("");
				$("#operating_area").val("");
				console.log("provider submitted");
				
			}else{
				console.log("provider not submitted");
			}
		
		e.preventDefault();
	});
	
	
	socket.on("provider_submitted",function(){
		setTimeout(function(){
			socket.emit("get_printing_providers");
		},1000);
		
	});
	
};