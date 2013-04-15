

var client_end_users = function(socket){
	
	try{
	
	var attachListeners = function(){
		
		
		
		
		
	};
	
	
	// start of end_users request and response
	$("#end_users").on("click",function(e){
		$("#menu").hide();
		socket.emit("get_end_users_page");
		e.preventDefault();
		
	});
	
	socket.on("end_users_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
		}).fadeIn("slow",function(){
			$("#menu").show("slow");
			attachListeners();
			socket.emit("get_all_end_users");
		});
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
			users +="<tr id='row_"+index+"'><td>"+value.f_name+"</td><td>"+value.l_name+"</td><td>"+value.username+"</td><td>"+value.email_address+"</td><td>"+value.physical_address+"</td><td>"+value.operating_area+"</td><td><button id='edit_"+index+"'>Edit</button><button id='submit_"+index+"'>Submit</button><button id='deactivate_"+index+"'>Toggle Activate Account</button></td></tr>";
		
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