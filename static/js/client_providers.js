

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
	
	var validateProviderEdit = function(f_name,l_name,email_address,physical_address,operating_area,index){
		
		 var isValid = true;
		var validate_f_name = /^[a-z]([0-9a-z_])+$/i;
		if( !(validate_f_name.test(f_name))){
			  	isValid = false;
			  	$("#row_"+index+" td:eq(0)").addClass("red_background");
			}
		
		
		var validate_l_name = /^[a-z]([0-9a-z_])+$/i;
		if((!validate_l_name.test(l_name))){
			 	isValid = false;
			 	$("#row_"+index+" td:eq(1)").addClass("red_background");
			}
		
		
		var validate_email_address = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
		    if(!validate_email_address.test(email_address)){
		    	 isValid = false;
		    	 $("#row_"+index+" td:eq(3)").addClass("red_background");
		    	
		    }
		
		
		var validate_physical_address = /^[a-z]([0-9a-z_])+$/i;
		if(!validate_physical_address.test(physical_address)){
			 	isValid = false;
			 	$("#row_"+index+" td:eq(4)").addClass("red_background");
			
			}
		
		var validate_operating_area = /^[a-z]([0-9a-z_])+$/i;
		if(!validate_operating_area.test(operating_area)){
				isValid = false;
				$("#row_"+index+" td:eq(5)").addClass("red_background");
			}
		
		return isValid;
	};
	
	if(localStorage["tables"]){
		var tables = JSON.parse(localStorage['tables']);
			if(tables.photographers_created=="No"){
				$("#get_service_providers").attr("disabled","disabled");
			}
	};
	
	var isValidFilter = function(filter_value,filter_category,success_callback){
		
		var validate_string = /^[a-z]([0-9a-z_])+$/i;
		 if(validate_string.test(filter_value)){
			 success_callback(filter_value,filter_category);
		 }
		
	};
	
	$("#filter_value").on("keyup",function(e){
		var filter_value = $.trim($("#filter_value").val()),
			filter_category = $("#filter_fields").val();
			
		if(filter_category!= "" && filter_category != "Select filter field"){
			isValidFilter(filter_value,filter_category,function(filter_value,filter_category){
					var filter_obj = {
							"filter_value" : filter_value,
							"filter_category" : filter_category	
							};
				socket.emit("filter_service_providers",JSON.stringify(filter_obj));
			});
			
		}else{
			
			socket.emit("get_printing_providers");
			
		}
		e.preventDefault();
	});
	
	
	$("#get_service_providers").on("click",function(e){
		
		socket.emit("get_printing_providers");
		e.preventDefault();
	});
	
	
	socket.on("printing_providers",function(providers){
		
		providers = JSON.parse(providers);
		
		var pros = "<table border='1'><thead><tr><td>First Name</td><td>Last Name</td><td>Username</td><td>Email Address</td><td>Physical Address</td><td>Operating Area</td><td>Operations</td></tr></thead><tbody>";
		
		$.each(providers,function(index,value){
			pros+="<tr id='row_"+index+"'><td>"+value.f_name+"</td><td>"+value.l_name+"</td><td>"+value.username+"</td><td>"+value.email_address+"</td><td>"+value.physical_address+"</td><td>"+value.operating_area+"</td><td><button id='edit_"+index+"'>Edit</button><button id='submit_"+index+"'>Submit</button><button id='delete_"+index+"'>Delete</button></td></tr>";
		
		});
		
		
		pros += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#providers").html(pros);
		
		// Adds event listeners for delete and edit buttons
	$.each(providers,function(index,value){
		
		    $("#submit_"+index).hide();
		
			$("#delete_"+index).on("click",function(e){
				
				console.log(index);
				var username = $("#row_"+index+" td:eq(2)").html();
				console.log(username);
				socket.emit("delete_service_provider",username);
				e.preventDefault();
			});
			
			$("#edit_"+index).on("click",function(e){
				
				// Grab the values which are currently on the TDs
				var f_name = $("#row_"+index+" td:eq(0)").html(),
					l_name = $("#row_"+index+" td:eq(1)").html(),
					email_address = $("#row_"+index+" td:eq(3)").html(),
					physical_address = $("#row_"+index+" td:eq(4)").html(),
					operating_area = $("#row_"+index+" td:eq(5)").html();
				
				
					// Create text input inside the TDs and assign to the input the values which were inside the TDs
				$("#row_"+index+" td:eq(0)").html("<input type='text' id='f_name_"+index+"' value='"+f_name+"' />");
				$("#row_"+index+" td:eq(1)").html("<input type='text' id='l_name_"+index+"' value='"+l_name+"'  />");
				$("#row_"+index+" td:eq(3)").html("<input type='text' id='email_address_"+index+"' value='"+email_address+"'  />");
				$("#row_"+index+" td:eq(4)").html("<input type='text' id='physical_address_"+index+"' value='"+physical_address+"'  />");
				$("#row_"+index+" td:eq(5)").html("<input type='text' id='operating_area_"+index+"' value='"+operating_area+"'  />");
				
				$("#edit_"+index).hide();
				$("#submit_"+index).show();
				
				// an event listener for our newly created submit button
				 $("#submit_"+index).on("click",function(e){
					 
					var f_name = $("#f_name_"+index).val(),
						l_name = $("#l_name_"+index).val(),
						username = $("#row_"+index+" td:eq(2)").html(),
						email_address = $("#email_address_"+index).val(),
						physical_address = $("#physical_address_"+index).val(),
						operating_area = $("#operating_area_"+index).val();
					  
					    
				if(validateProviderEdit(f_name,l_name,email_address,physical_address,operating_area,index)){
					 
				     var objProvider = {
				    		 "f_name" : f_name,
				    		 "l_name" : l_name,
				    		 "username" : username,
				    		 "email_address" : email_address,
				    		 "physical_address" : physical_address,
				    		 "operating_area" : operating_area
				     };
				     
				     socket.emit("update_service_provider",JSON.stringify(objProvider));
				     
				     $("#submit_"+index).hide();
				     $("#edit_"+index).show();
				     
				}
				    
					 e.preventDefault();
				 });
				
				
				e.preventDefault();
			});
			
		});
		
	});
	
	socket.on("printing_providers_fields",function(fields){
		
		fields = JSON.parse(fields);
		$("#filter_option").show("fast",function(){
			$("#filter_fields").html("<option>Select filter field</option>");
			for(key in fields){
				if(fields[key] != "service_code")
					$("#filter_fields").append("<option id='"+fields[key]+"'>"+fields[key]+"</option>");
			}
		});
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