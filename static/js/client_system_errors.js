

var client_system_errors = function(socket){
	
	var attachListeners = function(){
		
		$("#get_database_system_errors").on("click",function(e){
			
			socket.emit("get_database_system_errors");
			
			e.preventDefault();
		});
		
		
		$("#get_system_errors").on("click",function(e){
			
			socket.emit("get_system_errors");
			
			e.preventDefault();
		});
		
		$("#get_file_system_errors").on("click",function(e){
			
			socket.emit("get_file_system_errors");
			
			e.preventDefault();
		});
		
		
	};
	
	var populateTable = function(errors){
		
		var errs = "<table border='1'><thead><tr><td>Error Code</td><td>Error Number</td><td>System Call</td><td>Fatal</td><td>File Name</td><td>Line Number</td><td>Operations</td></tr></thead><tbody>";
		
		try{
		$.each(errors,function(index,value){
			
		if(errors[index])
			value = JSON.parse(errors[index]);
			console.log(value);
			console.log(value.error);
			errs+="<tr id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.syscall+"</td><td>"+value.error.fatal+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Delete</button></td></tr>";
			
		});
		}catch(ex){
			console.log(ex);
			
		}
		
		errs += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#errors").html(errs);
		
		
		
	};
	
	$("#system_errors").on("click",function(e){
		$("#menu").hide();
		socket.emit("get_system_errors_page");
		
		e.preventDefault();
	});
	
	socket.on("system_errors_page",function(data){
		
		$("#content").fadeOut("fast",function(){
			$(this).html(data);
			}).fadeIn("slow",function(){
				$("#menu").show("slow");
				attachListeners();
			});
		
		});
	

	
	socket.on("database_system_errors",function(errors){
		
		populateTable(errors);
		
		
	});
	
	socket.on("system_errors",function(errors){
		
		populateTable(errors);
		
	});
	
	socket.on("file_system_errors",function(errors){
		
		var errs = "<table border='1'><thead><tr><td>Error Code</td><td>Error Number</td><td>Path</td><td>File Name</td><td>Line Number</td><td>Operations</td></tr></thead><tbody>";
		
		try{
		$.each(errors,function(index,value){
			
		if(errors[index])
			value = JSON.parse(errors[index]);
			console.log(value);
			console.log(value.error);
			errs+="<tr id='row_"+index+"'><td>"+value.error.code+"</td><td>"+value.error.errno+"</td><td>"+value.error.path+"</td><td>"+value.file_name+"</td><td>"+value.line_number+"</td><td><button id='delete_error_"+index+"'>Delete</button></td></tr>";
			
		});
		}catch(ex){
			console.log(ex);
			
		}
		
		errs += "</tbody><tfoot><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table>";
		$("#errors").html(errs);
		
		
	});
	
	socket.on("get_database_log_error",function(){
		
		
		
	});
	
	socket.on("get_file_log_error",function(){
		
		
		
	});
	
	socket.on("get_system_log_error",function(){
		
		
		
	});
	
	
	
};