

var client_system_errors = function(socket){
	
	try{
		
		
	var selectedErrors = {
			name : ""
	};	
	
	var attachListeners = function(){
		
		
		$("#get_database_system_errors").on("click",function(e){
			
			socket.emit("get_database_system_errors");
			sessionStorage['current_view'] = "database_system_errors";
			
			e.preventDefault();
		});
		
		
		$("#get_system_errors").on("click",function(e){
			
			socket.emit("get_system_errors");
			sessionStorage['current_view'] = "system_errors";
			
			e.preventDefault();
		});
		
		$("#get_file_system_errors").on("click",function(e){
			
			socket.emit("get_file_system_errors");
			sessionStorage['current_view'] = "file_system_errors";
			
			e.preventDefault();
		});
		
		
		var isValidFilter = function(filter_value,filter_category,success_callback){
			
			var validate_string = /^[a-z]([0-9a-z_])+$/i;
			 if(validate_string.test(filter_value)){
				 success_callback(filter_value,filter_category);
			 }
			
		};
		
		
		$("#filter_value").on("keyup",function(e){
			var filter_value = $.trim($("#filter_value").val()),
				filter_category = $("#filter_fields").val();
				
			if(filter_category != "" && filter_category != "Select filter field"){
				isValidFilter(filter_value,filter_category,function(filter_value,filter_category){
						var filter_obj = {
								"filter_value" : filter_value,
								"filter_category" : filter_category	
								};
						
					switch(selectedErrors.name){
						   case "database" :
						   		socket.emit("filter_database_errors",JSON.stringify(filter_obj));
						   		console.log("Database filter category "+filter_obj.filter_category+" value "+filter_obj.filter_value);
						   		break;
						   case "file" :
							   socket.emit("filter_file_errors",JSON.stringify(filter_obj));
							   break;
						   case "system" :
							   socket.emit("filter_system_errors",JSON.stringify(filter_obj));
							   break;
						default:
							break;
						   		}
				});
				
			}else{
				
				socket.emit("get_printing_providers");
				
			}
			e.preventDefault();
		});
	};
	
	$("#system_errors").on("click",function(e){
		socket.emit("get_system_errors_page");
		sessionStorage['current_view'] = "system_errors_page";
		e.preventDefault();
	});
	
	socket.on("system_errors_page",function(data){
		
			$("#content").html(data);
				$("#filter_option").fadeOut("slow");
				attachListeners();
			
		
		});
	

	socket.on("database_system_errors",function(errors){
		
	if(sessionStorage['current_view'] === "database_system_errors"){
		
		var errs = "<table border='1'><thead><tr><td>Error Code</td><td>Error Number</td><td>System Call</td><td>Fatal</td><td>File Name</td><td>Line Number</td><td>Operations</td></tr></thead><tbody>";
		
		
		$.each(errors,function(index,value){
			
		if(errors[index]){
			value = JSON.parse(errors[index]);
			if(value.error.syscall==undefined)
				value.error.syscall = "N/A";
			if(value.error.fatal==undefined)
				value.error.fatal = "N/A";
			if(value.error.errno==undefined)
				value.error.errno = "N/A";
			
			
			if(value.error.fatal && value.error.fatal == true)
			 errs+="<tr style='color:red' id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.syscall+"</td><td>"+value.error.fatal+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Solved</button></td></tr>";
				else
					 errs+="<tr id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.syscall+"</td><td>"+value.error.fatal+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Solved</button></td></tr>";
		}
		
	});
		
		
		errs += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#errors").html(errs);
		
		sessionStorage['current_view'] = "database_system_errors";
		sessionStorage['listener_attached'] = "database_system_errors";
		
		$("#errors").append("<br /><a href='#' data-role='button' id='delete_all_database_system_errors' class='ui-btn ui-shadow ui-btn-inline ui-btn-up-b'><span class='ui-btn-inner'><span class='ui-btn-text' style='color:white;'>Delete All Database System Errors</span></span></a>");
		
		$("#delete_all_database_system_errors").on("click",function(e){
			
			socket.emit("delete_all_database_system_errors");
			console.log("delete all database system errors emitted");
			
			e.preventDefault();
		});
		
		socket.on("all_database_system_errors_deleted",function(){
			
			socket.emit("get_database_system_errors");
			
		});
		
	
		
		
		$.each(errors,function(index,value){
			
		
		$("#delete_error_"+index).on("click",function(e){
			
			console.log(index);
			var objFileError = { 
				
				error_code : $("#row_"+index+" td:eq(0)").html(),
				error_number : $("#row_"+index+" td:eq(1)").html(),
				error_syscall : $("#row_"+index+" td:eq(2)").html(),
				error_fatal : $("#row_"+index+" td:eq(3)").html(),
				error_file_name : $("#row_"+index+" td:eq(4)").html(),
				error_line_number : $("#row_"+index+" td:eq(5)").html()
			};
			
			
			socket.emit("delete_database_system_error",JSON.stringify(objFileError));
			e.preventDefault();
		});
		
	});
		
		
		$("#filter_option").fadeIn("slow");
		selectedErrors.name = "database";
		
		
	}
		
	});
	
	socket.on("system_errors",function(errors){
		
		var errs = "<table border='1'><thead><tr><td>Error Code</td><td>Error Number</td><td>System Call</td><td>Fatal</td><td>File Name</td><td>Line Number</td><td>Operations</td></tr></thead><tbody>";
		
		$.each(errors,function(index,value){
			
		if(errors[index]){
			value = JSON.parse(errors[index]);
			if(value.error.syscall==undefined)
				value.error.syscall = "N/A";
			if(value.error.fatal==undefined)
				value.error.fatal = "N/A";
			if(value.error.errno==undefined)
				value.error.errno = "N/A";
			
			
			if(value.error.fatal && value.error.fatal == true)
			 errs+="<tr style='color:red' id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.syscall+"</td><td>"+value.error.fatal+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Solved</button></td></tr>";
				else
					 errs+="<tr id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.syscall+"</td><td>"+value.error.fatal+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Solved</button></td></tr>";
		}
		
		});
		
		
		errs += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#errors").html(errs);
		sessionStorage['current_view'] = "system_errors";
		sessionStorage['listener_attached'] = "system_errors";
		
		$("#errors").append("<br /><a href='#' data-role='button' id='delete_all_system_errors' class='ui-btn ui-shadow ui-btn-inline ui-btn-up-b'><span class='ui-btn-inner'><span class='ui-btn-text' style='color:white;'>Delete All System Errors</span></span></a>");
		$("#delete_all_system_errors").on("click",function(e){
			
			socket.emit("delete_all_system_errors");
			console.log("delete all system errors emitted");
			e.preventDefault();
		});
		
		socket.on("all_system_errors_deleted",function(){
			
			socket.emit("get_system_errors");
			
		});
		
		$.each(errors,function(index,value){
		
			$("#delete_error_"+index).on("click",function(e){
			
				console.log(index);
				var objFileError = { 
						error_code : $("#row_"+index+" td:eq(0)").html(),
						error_number : $("#row_"+index+" td:eq(1)").html(),
						error_syscall : $("#row_"+index+" td:eq(2)").html(),
						error_fatal : $("#row_"+index+" td:eq(3)").html(),
						error_file_name : $("#row_"+index+" td:eq(4)").html(),
						error_line_number : $("#row_"+index+" td:eq(5)").html()
					};
			
			
			socket.emit("delete_system_error",JSON.stringify(objFileError));
			e.preventDefault();
		});
		
		
		});
		
		$("#filter_option").fadeIn("slow");
		selectedErrors.name = "database";
		
	});
	
	socket.on("file_system_errors",function(errors){
		
		var errs = "<table border='1'><thead><tr><td>Error Code</td><td>Error Number</td><td>Path</td><td>File Name</td><td>Line Number</td><td>Operations</td></tr></thead><tbody>";
		
		
		$.each(errors,function(index,value){
			
		if(errors[index]){
			value = JSON.parse(errors[index]);
			errs+="<tr id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.path+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Solved</button></td></tr>";
			
			}
		
		});
		
		
		errs += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#errors").html(errs);
		sessionStorage['current_view'] = "file_system_errors";
		sessionStorage['listener_attached'] = "file_system_errors";
		
		
		$("#errors").append("<br /><a href='#' data-role='button' id='delete_all_file_system_errors' class='ui-btn ui-shadow ui-btn-inline ui-btn-up-b'><span class='ui-btn-inner'><span class='ui-btn-text' style='color:white;'>Delete All File System Errors</span></span></a>");
		
		$("#delete_all_file_system_errors").on("click",function(e){
			
			socket.emit("delete_all_file_system_errors");
			console.log("delete all file system errors emitted");
			
			e.preventDefault();
		});
		
		socket.on("all_file_system_errors_deleted",function(){
			
			socket.emit("get_file_system_errors");
			
		});
		
		$.each(errors,function(index,value){
		
		$("#delete_error_"+index).on("click",function(e){
			
			console.log(index);
			var objFileError = { 
				error_code : $("#row_"+index+" td:eq(0)").html(),
				error_number : $("#row_"+index+" td:eq(1)").html(),
				error_path : $("#row_"+index+" td:eq(2)").html(),
				error_file_name : $("#row_"+index+" td:eq(3)").html(),
				error_line_number : $("#row_"+index+" td:eq(4)").html()
			};
			
			
			socket.emit("delete_file_system_error",JSON.stringify(objFileError));
			e.preventDefault();
		});
		
		});
		
		$("#filter_option").fadeIn("slow");
		selectedErrors.name = "file";
		
	});
	

	socket.on("get_database_log_error",function(){
		
		$("#filter_option").fadeOut("slow");
		$("#errors").html("Error retrieving database errors.");
		
	});
	
	socket.on("get_file_log_error",function(){
		$("#filter_option").fadeOut("slow");
		$("#errors").html("Error retrieving file errors.");
		
	});
	
	socket.on("get_system_log_error",function(){
		
		$("#filter_option").fadeOut("slow");
		$("#errors").html("Error retrieving system errors.");
		
		
	});
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_system_errors.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
};