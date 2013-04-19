

	var client_sample_data = function(socket){
	
		
  try{

	
	$("#add_samples").on("click",function(){
		
		socket.emit("add_sample_data");
		
	});
	
	socket.on("sample_orders_added",function(){
		
		$("#sample_orders_added").html("Yes");
		$("#empty_orders_table").removeAttr("disabled");
		$("#delete_orders_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_orders_error",function(){
		
		$("#add_sample_orders").removeAttr("disabled");
		
	});


	socket.on("sample_photographers_added",function(){
		
		$("#sample_photographers_added").html("Yes");
		$("#empty_photographers_table").removeAttr("disabled");
		$("#delete_photographers_table").removeAttr("disabled");
		
	});

	socket.on("sample_packages_added",function(){
		
		$("#sample_packages_added").html("Yes");
		$("#empty_packages_table").removeAttr("disabled");
		$("#delete_packages_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_packages_error",function(){
		
		$("#add_sample_packages").removeAttr("disabled");
		
	});

	socket.on("sample_cities_added",function(){
		
		$("#sample_cities_added").html("Yes");
		$("#empty_city_table").removeAttr("disabled");
		$("#delete_city_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_cities_error",function(){
		
		$("#add_sample_cities").removeAttr("disabled");
		
	});

	socket.on("sample_areas_added",function(){
		
		$("#sample_areas_added").html("Yes");
		$("#empty_areas_table").removeAttr("disabled");
		$("#delete_areas_table").removeAttr("disabled");
		
		
	});
	
	socket.on("add_sample_areas_error",function(){
		
		$("#add_sample_areas").removeAttr("disabled");
		
	});

	socket.on("sample_userIDs_added",function(){
		
		$("#sample_userIDs_added").html("Yes");
		$("#empty_userIDs_table").removeAttr("disabled");
		$("#delete_userIDs_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_userIDs_error",function(){
		
		$("#add_sample_userIDs").removeAttr("disabled");
		
	});
	
	socket.on("sample_users_added",function(){
		
		$("#sample_users_added").html("Yes");
		$("#empty_users_table").removeAttr("disabled");
		$("#delete_users_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_users_error",function(){
		
		$("#add_sample_users").removeAttr("disabled");
		
	});
	
	socket.on("sample_admin_added",function(){
		
		$("#sample_admin_added").html("Yes");
		$("#empty_admin_table").removeAttr("disabled");
		$("#delete_admin_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_admin_error",function(){
		
		$("#add_sample_admin").removeAttr("disabled");
		
	});
	
	socket.on("sample_admin_rights_added",function(){
		
		$("#sample_admin_rights_added").html("Yes");
		$("#empty_admin_rights_table").removeAttr("disabled");
		$("#delete_admin_rights_table").removeAttr("disabled");
		
	});
	
	socket.on("add_sample_admin_rights_error",function(){
		
		$("#add_sample_admin_rights").removeAttr("disabled");
		
	});
	
	socket.on("sample_alerts_added",function(){
		
		$("#sample_alerts_added").html("Yes");
		$("#empty_alerts_table").removeAttr("disabled");
		$("#delete_alerts_table").removeAttr("disabled");
		
		
		
	});
	
	socket.on("add_sample_alerts_error",function(){
		
		$("#add_sample_alerts").removeAttr("disabled");
		
	});
	
	socket.on("sample_delivery_method_added",function(){
		
		$("#sample_delivery_method_added").html("Yes");
		$("#empty_delivery_method_table").removeAttr("disabled");
		$("#delete_delivery_method_table").removeAttr("disabled");
		
		
		
	});
	
	socket.on("add_sample_delivery_method_error",function(){
		
		$("#add_sample_delivery_method").removeAttr("disabled");
		
	});
	
	
	
		
		}catch(error){
			
			console.log(error);
			
			var objError = {
					"error" : error.message,
					"file_name" : "client_sample_data_logic.js",
					"line_number" : 1
			};
			
			socket.emit("log_system_error",JSON.stringify(objError));
			
		}
	
	
};