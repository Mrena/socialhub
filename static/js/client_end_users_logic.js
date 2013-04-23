

var client_end_users = function(socket){
	
	try{
		
		
		var validateUserInfo = function(f_name,l_name,username,password,email_address,physical_address){
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
		
		
		return isValid;
	};
		
		
		var attachAddUserListeners = function(){
			
			
			
		$("#submit_end_user").on("click",function(e){
				
				
				var f_name = $.trim($("#f_name").val()),
			       l_name = $.trim($("#l_name").val()),
			       username = $.trim($("#username").val()),
			       password = $.trim($("#password").val()),
			       email_address = $.trim($("#email_address").val()),
			       physical_address = $.trim($("#physical_address").val());
				
				if(validateUserInfo(f_name,l_name,username,password,email_address,physical_address)){
					
					var UserInfo = {
							"f_name" : f_name,
							"l_name" : l_name,
							"username" : username,
							"password" : password,
							"email_address" : email_address,
							"physical_address" : physical_address
					};
					
					socket.emit("submit_end_user",JSON.stringify(UserInfo));
					
					$("#f_name").val("");
					$("#l_name").val("");
					$("#username").val("");
					$("#password").val("");
					$("#email_address").val("");
					$("#physical_address").val("");
					
					
				}else{
					console.log("provider not submitted");
				}
			
				
				e.preventDefault();
			});
			
			
			
		};
	
	var attachListeners = function(){
		
		$("#get_all_end_users").on("click",function(e){
			
			socket.emit("get_all_end_users");
			
			e.preventDefault();
		});
		
		$("#add_end_user").on("click",function(e){
			
			socket.emit("get_add_end_user_form");
			
			e.preventDefault();
		});
		
		
		
	};
	
	
	socket.on("add_end_user_form",function(data){
		
		$("#all_end_users").html(data);
		attachAddUserListeners();
		
	});
	
	
	// start of end_users request and response
	$("#end_users").on("click",function(e){
		socket.emit("get_end_users_page");
		e.preventDefault();
		
	});
	
	socket.on("end_users_page",function(data){
		
			$("#content").html(data);
			attachListeners();
			
		
	});
	
	// end of end_users request and response
	
	// start of end_users request and response
	$("#sign_in").on("click",function(e){
		$("#menu").hide();
		socket.emit("get_sign_in_page");
		e.preventDefault();
		
	});
	
	socket.on("sign_in_page",function(data){
		
		$("#page").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
		});
	});
	
	// end of end_users request and response
	
	socket.on("all_end_users",function(objEndUsers){
		
		end_users = JSON.parse(objEndUsers);
		var users = "<table border='1'><thead><tr><td>First Name</td><td>Last Name</td><td>Username</td><td>Email Address</td><td>Physical Address</td><td>Operating Area</td><td>Operations</td></tr></thead><tbody>";
		$.each(end_users,function(index,value){
			users +="<tr id='row_"+index+"'><td>"+value.f_name+"</td><td>"+value.l_name+"</td><td>"+value.username+"</td><td>"+value.email_address+"</td><td>"+value.physical_address+"</td><td>"+value.operating_area+"</td><td><button id='edit_"+index+"'>Edit</button><button id='submit_"+index+"'>Submit</button><button id='deactivate_"+index+"'>Toggle Activate</button></td></tr>";
		
		});
		
		users += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#all_end_users").html(users);
		
	});
	
	socket.on("get_end_users_error",function(){
		
		$("#all_end_users").html("Could not retrieve end users.");
		
	});
	
	socket.on("end_users_fields",function(){
		
		fields = JSON.parse(fields);
		$("#filter_option").show("fast",function(){
			$("#filter_fields").html("<option>Select filter field</option>");
			for(key in fields){
					$("#filter_fields").append("<option id='"+fields[key]+"'>"+fields[key]+"</option>");
			}
		});
		
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_end_users_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
		
};