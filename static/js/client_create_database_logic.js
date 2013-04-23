

        var populateTableCreatedData = function(table_created,table_name){
        	
        	if(table_created){
        		
        		switch(table_name){
        		case "userids" : $("#userIDs_created").text("Yes");
        			break;
        		default: $("#"+table_name+"_created").text("Yes");
        			break;
        		}
        		
        	}
        	
        };
        
        var populateTableSamplesAddedData = function(samples_added,table_name){
        	
        	if(samples_added){
        		
        		switch(table_name){
        		case "city" : $("#sample_cities_added").text("Yes");
        			break;
        		case "userids": $("#sample_userIDs_added").text("Yes");
        			break;
        			default: $("#sample_"+table_name+"_added").text("Yes");
        				break;
        
        		}
        		
        		
        	}
        	
        };
        
        var populateButtonsState = function(table_name,table_created,samples_added){
        	
        	

        	if(table_created){
        		
        		
        		switch(table_name){
        			case "userids" : $("#add_sample_userIDs").removeAttr("disabled");
        							 $("#delete_userIDs_table").removeAttr("disabled");
        				break;
        			case "city": $("#add_sample_cities").removeAttr("disabled");
        			 			 $("#delete_city_table").removeAttr("disabled");
        				break;
        			default: $("#add_sample_"+table_name).removeAttr("disabled");
        					 $("#delete_"+table_name+"_table").removeAttr("disabled");
        				break;
        		}
        		
        	}else{
        		
        		switch(table_name){
    			case "userids" : $("#create_userIDs_table").removeAttr("disabled");
    				break;
    			default: $("#create_"+table_name+"_table").removeAttr("disabled");
    				break;
    		
    		}
        		
        		
        }
        	
        	
        	if(samples_added){
        		
        		switch(table_name){
        			case "userids": $("#empty_userIDs_table").removeAttr("disabled");
       			 					$("#add_sample_userIDs").attr("disabled","disabled");
        				break;
        			case "city":	$("#empty_city_table").removeAttr("disabled");
       			 					$("#add_sample_cities").attr("disabled","disabled");
        				break;
        			default:		$("#empty_"+table_name+"_table").removeAttr("disabled");
   				 					$("#add_sample_"+table_name).attr("disabled","disabled");
        			    break;
        		}
        		
        	}else{
        		
        		switch(table_name){
    			case "userids": $("#add_sample_userIDs").removeAttr("disabled");
    				break;
    			case "city": $("#add_sample_cities").removeAttr("disabled");
    				break;
    			default: $("#add_sample_"+table_name).removeAttr("disabled");
    			    break;
    		}
        		
        }
        	
        	
      
     };
        
        var populateResetButtonState = function(tablesData){
        	
        	var number_of_tables = 12,
        	    created_tables = 0;
        	tablesData.forEach(function(tableData){
        		
        		if(tableData.created){
        			
        			created_tables++;
        		}
        		
        	});
        	
        	number_of_tables == created_tables ? $("#reset_system").removeAttr("disabled") : "";
        	
        };
        
      var populateMainButtonsState = function(tablesData){
        	
        	tablesData.forEach(function(tableData){
        		
        		if(tableData.created){
        			var $create_tables = $("#create_tables");
        			 $create_tables.attr("disabled","disabled");
        			 $create_tables.addClass("ui-state-disabled");
        			$("#reset_system").removeAttr("disabled");
        			
        			if(tableData.samples_added){
        				var $add_samples = $("#add_samples");
        				$add_samples.attr("disabled","disabled")
        				.addClass("ui-state-disabled")
        				.unbind();
        				
        				 return;
        			}
        		}
        		
        	});
        	
        	
        };

        var populateTablesData = function(tablesData){
        	
        	
        	populateMainButtonsState(tablesData);
        	populateResetButtonState(tablesData);
		    
        	/*var tablesLen = tablesData.length,
        	    created = 0;
        	 console.log(tablesLen); */
        	tablesData.forEach(function(tableData){
			
			   populateTableCreatedData(tableData.created,tableData.name);
			   populateTableSamplesAddedData(tableData.samples_added,tableData.name);
			   populateButtonsState(tableData.name,tableData.created,tableData.samples_added);
			   
			  /* if(tablesData.created){
				   ++created;
			   }*/
			   
			});
        	
        /*	if(created < tablesLen){
        		$("#add_samples").addClass("ui-state-disabled").unbind();
        	}*/
	
        };



	var client_create_database = function(socket){
		
		try{
	
        var disableAllOperationsButton = function($that){
        	
        	var thatsClass = $that.attr("class");
        	$("."+thatsClass).attr("disabled","disabled");
        	
        };
        
        
		//socket.emit("startup");

		$("#submit_database_name").on("click",function(e){
	
			var database_name = $.trim($("#database_name").val());
				if(database_name!="")
					socket.emit("create_database",database_name);
				
				e.preventDefault();
			});


		$("#create_tables").on("click",function(e){
	
			socket.emit("create_tables_table");
			console.log("Create tables table emitted");
			$(this).attr("disabled","disabled").addClass("ui-state-disabled").unbind();
			
			e.preventDefault();
	
		});
		
		socket.on("tables_table_created",function(){
			
			socket.emit("create_tables");
			console.log("Create tables emitted");
			
		});
		
		
		var attachResetListener = function(){
		
			$("#reset_system").on("click",function(e){
			
				socket.emit("reset_system");
				$(this).attr("disabled","disabled").addClass("ui-state-disabled").unbind();
			
				e.preventDefault();
			});
		
		};
		
		attachResetListener();
		
		socket.on("system_reset",function(){
			
			socket.emit("get_database_content");
			
		});
		
		socket.on("system_reset_error",function(){
			
			$("#reset_system").removeAttr("disabled").on("click",attachResetListener);
			
		});
		
		
		// city socket listeners
		
		socket.on("city_created",function(){
			$("#city_created").html("Yes");
			$("#delete_city_table").removeAttr("disabled");
			$("#add_sample_cities").removeAttr("disabled");
			
		});
		
		
		socket.on("create_table_city_error",function(){
			
			var $create_city_table = $("#create_city_table");
				$create_city_table.removeAttr("disabled");
	
		});
		
		socket.on("table_city_deleted",function(){
			
			$("#city_created").text("No");
			$("#create_city_table").removeAttr("disabled");
			$("#add_sample_cities").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_city_error",function(){
			
			$("#delete_city_table").removeAttr("disabled");
			$("#city_error_message").text("Error deleting city table");
			
		});
		
		socket.on("table_city_emptied",function(){
				
			$("#sample_cities_added").text("No");
			$("#add_sample_cities").removeAttr("disabled");
			$("#delete_city_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_city_error",function(){
			
			$("#empty_city_table").removeAttr("disabled");
			$("#city_error_message").text("Error emptying city table");
			
		});
		
		// photographers socket listeners

		socket.on("photographers_created",function(){
			$("#photographers_created").html("Yes");
			$("#delete_photographers_table").removeAttr("disabled");
			$("#add_sample_photographers").removeAttr("disabled");
		
		});
		
		
		socket.on("create_table_photographers_error",function(){
			
			var $create_photographers_table = $("#create_photographers_table");
				$create_photographers_table.removeAttr("disabled");
				
			
			
		});
		
		
		socket.on("table_photographers_deleted",function(){
			
			$("#photographers_created").text("No");
			$("#sample_photographers_added").text("No");
			$("#create_photographers_table").removeAttr("disabled");
			$("#add_sample_photographers").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_photographers_error",function(){
			
			$("#delete_photographers_table").removeAttr("disabled");
			$("#photographers_error_message").text("Error deleting photographers table");
			
		});
		
		socket.on("table_photographers_emptied",function(){
				
			$("#sample_photographers_added").text("No");
			$("#add_sample_photographers").removeAttr("disabled");
			$("#delete_photographers_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_photographers_error",function(){
			
			$("#empty_photographers_table").removeAttr("disabled");
			$("#photographers_error_message").text("Error emptying photographers table");
			
		});
		
		
		// areas socket listeners

		socket.on("areas_created",function(){
			$("#areas_created").html("Yes");
			$("#delete_areas_table").removeAttr("disabled");
			$("#add_sample_areas").removeAttr("disabled");
			
		});
		
		
		
		socket.on("create_table_areas_error",function(){
			
			var $created_areas_table = $("#create_areas_table");
				$created_areas_table.removeAttr("disabled");
			
		});
		
		
		
		socket.on("table_areas_deleted",function(){
			
			$("#areas_created").text("No");
			$("#sample_areas_added").text("No");
			$("#create_areas_table").removeAttr("disabled");
			$("#add_sample_areas").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_areas_error",function(){
			
			$("#delete_areas_table").removeAttr("disabled");
			$("#areas_error_message").text("Error deleting areas table");
			
		});
		
		socket.on("table_areas_emptied",function(){
				
			$("#sample_areas_added").text("No");
			$("#add_sample_areas").removeAttr("disabled");
			$("#delete_areas_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_areas_error",function(){
			
			$("#empty_areas_table").removeAttr("disabled");
			$("#areas_error_message").text("Error emptying areas table");
			
		});
		
		
		
		// packages socket listeners

		socket.on("packages_created",function(){
			$("#packages_created").html("Yes");
			$("#delete_packages_table").removeAttr("disabled");
			$("#add_sample_packages").removeAttr("disabled");
			
		});
		
		
		socket.on("create_table_packages_error",function(){
			
			var $create_packages_table = $("#create_packages_table");
				$create_packages_table.removeAttr("disabled");
				
		});
		
		socket.on("table_packages_deleted",function(){
			
			$("#packages_created").text("No");
			$("#sample_packages_added").text("No");
			$("#create_packages_table").removeAttr("disabled");
			$("#add_sample_packages").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_packages_error",function(){
			
			$("#delete_packages_table").removeAttr("disabled");
			$("#packages_error_message").text("Error deleting packages table");
			
		});
		
		socket.on("table_packages_emptied",function(){
				
			$("#sample_packages_added").text("No");
			$("#add_sample_packages").removeAttr("disabled");
			$("#delete_packages_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_packages_error",function(){
			
			$("#empty_packages_table").removeAttr("disabled");
			$("#packages_error_message").text("Error emptying packages table");
			
		});
		
		
		// orders socket listeners

		socket.on("orders_created",function(){
			$("#orders_created").html("Yes");
			$("#delete_orders_table").removeAttr("disabled");
			$("#add_sample_orders").removeAttr("disabled");
			
		});
		
		
		socket.on("create_table_orders_error",function(){
			
			var $create_orders_table = $("#create_orders_table");
				$create_orders_table.removeAttr("disabled");
				
		});
		
		socket.on("table_orders_deleted",function(){
			
			$("#orders_created").text("No");
			$("#sample_orders_added").text("No");
			$("#create_orders_table").removeAttr("disabled");
			$("#add_sample_orders").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_orders_error",function(){
			
			$("#delete_orders_table").removeAttr("disabled");
			$("#orders_error_message").text("Error deleting orders table");
			
		});
		
		socket.on("table_orders_emptied",function(){
				
			$("#sample_orders_added").text("No");
			$("#add_sample_orders").removeAttr("disabled");
			$("#delete_orders_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_orders_error",function(){
			
			$("#empty_orders_table").removeAttr("disabled");
			$("#orders_error_message").text("Error emptying orders table");
			
		});
		
		
		// userIDs socket listeners

		socket.on("userIDs_created",function(){
			$("#userIDs_created").html("Yes");
			$("#delete_userIDs_table").removeAttr("disabled");
			$("#add_sample_usersIDs").removeAttr("disabled");
			
	   });
		
		socket.on("create_table_userids_error",function(){
			
			var $create_userIDs_table = $("#create_userids_table");
				$create_userIDs_table.removeAttr("disabled");
				
		});
		
		socket.on("table_userIDs_deleted",function(){
			
			$("#userIDs_created").text("No");
			$("#sample_userIDs_added").text("No");
			$("#create_userIDs_table").removeAttr("disabled");
			$("#add_sample_userIDs").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_userIDs_error",function(){
			
			$("#delete_userIDs_table").removeAttr("disabled");
			$("#userIDs_error_message").text("Error deleting userIDs table");
			
		});
		
		socket.on("table_userIDs_emptied",function(){
				
			$("#sample_userIDs_added").text("No");
			$("#add_sample_userIDs").removeAttr("disabled");
			$("#delete_userIDs_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_userIDs_error",function(){
			
			$("#empty_userIDs_table").removeAttr("disabled");
			$("#userIDs_error_message").text("Error emptying userIDs table");
			
		});
		
		
		// users socket listeners
		
		socket.on("users_created",function(){
			$("#users_created").html("Yes");
			$("#delete_users_table").removeAttr("disabled");
			$("#add_sample_users").removeAttr("disabled");
		
		});
		
		socket.on("create_table_users_error",function(){
			
			var $create_users_table = $("#create_users_table");
				$create_users_table.removeAttr("disabled");
			
		});
		
		socket.on("table_users_deleted",function(){
			
			$("#users_created").text("No");
			$("#sample_users_added").text("No");
			$("#create_users_table").removeAttr("disabled");
			$("#add_sample_users").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_users_error",function(){
			
			$("#delete_users_table").removeAttr("disabled");
			$("#users_error_message").text("Error deleting users table");
			
		});
		
		socket.on("table_users_emptied",function(){
				
			$("#sample_users_added").text("No");
			$("#add_sample_users").removeAttr("disabled");
			$("#delete_users_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_users_error",function(){
			
			$("#empty_users_table").removeAttr("disabled");
			$("#users_error_message").text("Error emptying users table");
			
		});
		
		
		// admin socket listeners
		
		socket.on("admin_created",function(){
			$("#admin_created").html("Yes");
			$("#delete_admin_table").removeAttr("disabled");
			$("#add_sample_admin").removeAttr("disabled");
	
		});
		
		socket.on("create_table_admin_error",function(){
			
			var $create_admin_table = $("#create_admin_table");
				$create_admin_table.removeAttr("disabled");
				
		});
		
		socket.on("table_admin_deleted",function(){
			
			$("#admin_created").text("No");
			$("#sample_admin_added").text("No");
			$("#create_admin_table").removeAttr("disabled");
			$("#add_sample_admin").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_admin_error",function(){
			
			$("#delete_admin_table").removeAttr("disabled");
			$("#admin_error_message").text("Error deleting admin table");
			
		});
		
		socket.on("table_admin_emptied",function(){
				
			$("#sample_admin_added").text("No");
			$("#add_sample_admin").removeAttr("disabled");
			$("#delete_admin_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_admin_error",function(){
			
			$("#empty_admin_table").removeAttr("disabled");
			$("#admin_error_message").text("Error emptying rights table");
			
		});
		
		
		
		
		// admin_rights socket listeners
		
		socket.on("admin_rights_created",function(){
			$("#admin_rights_created").html("Yes");
			$("#delete_admin_rights_table").removeAttr("disabled");
			$("#add_sample_admin_rights").removeAttr("disabled");
			
			});
		
		socket.on("create_table_admin_rights_error",function(){
			
			var $create_admin_rights_table = $("#create_admin_rights_table");
				$create_admin_rights_table.removeAttr("disabled");
			
		});
		
		socket.on("table_admin_rights_deleted",function(){
			
			$("#admin_rights_created").text("No");
			$("#sample_admin_rights_added").text("No");
			$("#create_admin_rights_table").removeAttr("disabled");
			$("#add_sample_admin_rights").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_admin_rights_error",function(){
			
			$("#delete_admin_rights_table").removeAttr("disabled");
			$("#admin_rights_error_message").text("Error deleting admin rights table");
			
		});
		
		socket.on("table_admin_rights_emptied",function(){
				
			$("#sample_admin_rights_added").text("No");
			$("#add_sample_admin_rights").removeAttr("disabled");
			$("#delete_admin_rights_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_admin_rights_error",function(){
			
			$("#empty_admin_rights_table").removeAttr("disabled");
			$("#admin_rights_error_message").text("Error emptying admin rights table");
			
		});
		
		
		// alerts socket listeners
		
		socket.on("alerts_created",function(){
			$("#alerts_created").html("Yes");
			$("#delete_alerts_table").removeAttr("disabled");
			$("#add_sample_alerts").removeAttr("disabled");
		
		});
		
		socket.on("create_table_alerts_error",function(){
			
			var $create_alerts_table = $("#create_alerts_table");
				$create_alerts_table.removeAttr("disabled");
			
		});
		
		socket.on("table_alerts_deleted",function(){
			
			$("#alerts_created").text("No");
			$("#sample_alerts_added").text("No");
			$("#create_alerts_table").removeAttr("disabled");
			$("#add_sample_alerts").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_alerts_error",function(){
			
			$("#delete_alerts_table").removeAttr("disabled");
			$("#alerts_error_message").text("Error deleting alerts table");
			
		});
		
		socket.on("table_alerts_emptied",function(){
				
			$("#sample_alerts_added").text("No");
			$("#add_sample_alerts").removeAttr("disabled");
			$("#delete_alerts_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_alerts_error",function(){
			
			$("#empty_alerts_table").removeAttr("disabled");
			$("#alerts_error_message").text("Error emptying alerts table");
			
		});
		
		
		// delivery_method socket listeners
		
		socket.on("delivery_method_created",function(){
			$("#delivery_method_created").html("Yes");
			$("#delete_delivery_method_table").removeAttr("disabled");
			$("#add_sample_delivery_method").removeAttr("disabled");
		
		});
		
		socket.on("create_table_delivery_method_error",function(){
			
			var $create_delivery_method_table = $("#create_delivery_method_table");
				$create_delivery_method_table.removeAttr("disabled");
			
		});
		
		socket.on("table_delivery_method_deleted",function(){
			
			$("#delivery_method_created").text("No");
			$("#sample_delivery_method_added").text("No");
			$("#create_delivery_method_table").removeAttr("disabled");
			$("#add_sample_delivery_method").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_delivery_method_error",function(){
			
			$("#delete_delivery_method_table").removeAttr("disabled");
			$("#delivery_method_error_message").text("Error deleting delivery method table");
			
		});
		
		socket.on("table_delivery_method_emptied",function(){
				
			$("#sample_delivery_method_added").text("No");
			$("#add_sample_delivery_method").removeAttr("disabled");
			$("#delete_delivery_method_table").removeAttr("disabled");
			
		});
		
		socket.on("empty_table_delivery_method_error",function(){
			
			$("#empty_delivery_method_table").removeAttr("disabled");
			$("#delivery_method_error_message").text("Error emptying delivery method table");
			
		});
		
		
		
		$(".photographers_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_photographers_table": $(this).attr("disabled","disabled");
												   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												   disableAllOperationsButton($(this));
												   socket.emit("create_photographers_table");
					break;
				case "add_sample_photographers":  $(this).attr("disabled","disabled");
												  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												  disableAllOperationsButton($(this));
												  socket.emit("add_sample_photographers");
					break;
				case "delete_photographers_table": $(this).attr("disabled","disabled");
												   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												   $("#reset_system").attr("disabled","disabled");
												   disableAllOperationsButton($(this));
												   socket.emit("delete_photographers_table");
					break;
				case "empty_photographers_table": $(this).attr("disabled","disabled");
												  disableAllOperationsButton($(this));
												  socket.emit("empty_photographers_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".areas_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_areas_table": 	$(this).attr("disabled","disabled");
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										    socket.emit("create_areas_table");
					break;
				case "add_sample_areas":  $(this).attr("disabled","disabled");
										  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_areas");
					break;
				case "delete_areas_table": $(this).attr("disabled","disabled");
										   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("delete_areas_table");
					break;
				case "empty_areas_table": $(this).attr("disabled","disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("empty_areas_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".city_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_city_table": 	$(this).attr("disabled","disabled");
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										    socket.emit("create_city_table");
					break;
				case "add_sample_cities":  $(this).attr("disabled","disabled");
										   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("add_sample_cities");
					break;
				case "delete_city_table": $(this).attr("disabled","disabled");
										  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  disableAllOperationsButton($(this));
										  socket.emit("delete_city_table");
					break;
				case "empty_city_table": $(this).attr("disabled","disabled");
										 disableAllOperationsButton($(this));
										 socket.emit("empty_city_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".packages_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_packages_table": $(this).attr("disabled","disabled");
											  $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											  disableAllOperationsButton($(this));
										      socket.emit("create_packages_table");
					break;
				case "add_sample_packages":  $(this).attr("disabled","disabled");
											 $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											 disableAllOperationsButton($(this));
										  	 socket.emit("add_sample_packages");
					break;
				case "delete_packages_table": $(this).attr("disabled","disabled");
											  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											  $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											  disableAllOperationsButton($(this));
										   	  socket.emit("delete_packages_table");
					break;
				case "empty_packages_table": $(this).attr("disabled","disabled");
											 disableAllOperationsButton($(this));
										  	 socket.emit("empty_packages_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".orders_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_orders_table": $(this).attr("disabled","disabled");
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										    socket.emit("create_orders_table");
					break;
				case "add_sample_orders":  $(this).attr("disabled","disabled");
										   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("add_sample_orders");
					break;
				case "delete_orders_table": $(this).attr("disabled","disabled");
											$("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										   	socket.emit("delete_orders_table");
					break;
				case "empty_orders_table": $(this).attr("disabled","disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("empty_orders_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".delivery_method_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_delivery_method_table": $(this).attr("disabled","disabled");
													 $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
													 disableAllOperationsButton($(this));
										      		 socket.emit("create_delivery_method_table");
					break;
				case "add_sample_delivery_method":  $(this).attr("disabled","disabled");
												    $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												    disableAllOperationsButton($(this));
												    socket.emit("add_sample_delivery_method");
					break;
				case "delete_delivery_method_table": $(this).attr("disabled","disabled");
													 $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
													 $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
													 disableAllOperationsButton($(this));
													 socket.emit("delete_delivery_method_table");
					break;
				case "empty_delivery_method_table": $(this).attr("disabled","disabled");
													disableAllOperationsButton($(this));
													socket.emit("empty_delivery_method_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".userIDs_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_userIDs_table": $(this).attr("disabled","disabled");
											 $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											 disableAllOperationsButton($(this));
										     socket.emit("create_userIDs_table");
					break;
				case "add_sample_userIDs":  $(this).attr("disabled","disabled");
											$("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										  	socket.emit("add_sample_userIDs");
					break;
				case "delete_userIDs_table": $(this).attr("disabled","disabled");
											 $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											 $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											 disableAllOperationsButton($(this));
										   	 socket.emit("delete_userIDs_table");
					break;
				case "empty_userIDs_table": $(this).attr("disabled","disabled");
											disableAllOperationsButton($(this));
										  	socket.emit("empty_userIDs_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".users_btnDB_operations").on("click",function(e){
			 
			var id = $(this).attr("id");
			switch(id.toString()){
				case "create_users_table": $(this).attr("disabled","disabled");
										   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("create_users_table");
					break;
				case "add_sample_users":  $(this).attr("disabled","disabled");
										  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_users");
					break;
				case "delete_users_table": $(this).attr("disabled","disabled");
										   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("delete_users_table");
					break;
				case "empty_users_table": $(this).attr("disabled","disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("empty_users_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".admin_btnDB_operations").on("click",function(e){
			 
			var id = $(this).attr("id");
			switch(id.toString()){
				case "create_admin_table": $(this).attr("disabled","disabled");
										   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("create_admin_table");
					break;
				case "add_sample_admin":  $(this).attr("disabled","disabled");
										  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_admin");
					break;
				case "delete_admin_table": $(this).attr("disabled","disabled");
										   $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										   disableAllOperationsButton($(this));
										   socket.emit("delete_admin_table");
					break;
				case "empty_admin_table": $(this).attr("disabled","disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("empty_admin_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".admin_rights_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_admin_rights_table":  $(this).attr("disabled","disabled");
												   $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												   disableAllOperationsButton($(this));
												   socket.emit("create_admin_rights_table");
					break;
				case "add_sample_admin_rights":   $(this).attr("disabled","disabled");
												  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												  disableAllOperationsButton($(this));
										  		  socket.emit("add_sample_admin_rights");
					break;
				case "delete_admin_rights_table": $(this).attr("disabled","disabled");
												  $("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												  $("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
												  disableAllOperationsButton($(this));
										   	  	  socket.emit("delete_admin_rights_table");
					break;
				case "empty_admin_rights_table":  $(this).attr("disabled","disabled");
												  disableAllOperationsButton($(this));
										  	  	  socket.emit("empty_admin_rights_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".alerts_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_alerts_table": $(this).attr("disabled","disabled");
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										    socket.emit("create_alerts_table");
					break;
				case "add_sample_alerts":  $(this).attr("disabled","disabled");
											disableAllOperationsButton($(this));
											$("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
										  	socket.emit("add_sample_alerts");
					break;
				case "delete_alerts_table": $(this).attr("disabled","disabled");
											$("#add_samples").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											$("#reset_system").attr("disabled","disabled").addClass("ui-state-disabled").unbind();
											disableAllOperationsButton($(this));
										   	socket.emit("delete_alerts_table");
					break;
				case "empty_alerts_table": $(this).attr("disabled","disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("empty_alerts_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		
		}catch(error){
			
			console.log(error);
			
			var objError = {
					"error" : error.message,
					"file_name" : "client_create_database_logic.js",
					"line_number" : 1
			};
			
			socket.emit("log_system_error",JSON.stringify(objError));
		}

};