

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
        			case "userids" : $("#add_sample_userIDs").removeClass("ui-state-disabled");
        							 $("#delete_userIDs_table").removeClass("ui-state-disabled");
        				break;
        			case "city": $("#add_sample_cities").removeClass("ui-state-disabled");
        			 			 $("#delete_city_table").removeClass("ui-state-disabled");
        				break;
        			default: $("#add_sample_"+table_name).removeClass("ui-state-disabled");
        					 $("#delete_"+table_name+"_table").removeClass("ui-state-disabled");
        				break;
        		}
        		
        	}else{
        		
        		switch(table_name){
    			case "userids" : $("#create_userIDs_table").removeClass("ui-state-disabled");
    				break;
    			default: $("#create_"+table_name+"_table").removeClass("ui-state-disabled");
    				break;
    		
    		}
        		
        		
        }
        	
        	
        	if(samples_added){
        		
        		switch(table_name){
        			case "userids": $("#empty_userIDs_table").removeClass("ui-state-disabled");
       			 					$("#add_sample_userIDs").addClass("ui-state-disabled");
        				break;
        			case "city":	$("#empty_city_table").removeClass("ui-state-disabled");
       			 					$("#add_sample_cities").addClass("ui-state-disabled");
        				break;
        			default:		$("#empty_"+table_name+"_table").removeAttr("disabled");
   				 					$("#add_sample_"+table_name).addClass("ui-state-disabled");
        			    break;
        		}
        		
        	}else{
        		
        		switch(table_name){
    			case "userids": $("#add_sample_userIDs").removeClass("ui-state-disabled");
    				break;
    			case "city": $("#add_sample_cities").removeClass("ui-state-disabled");
    				break;
    			default: $("#add_sample_"+table_name).removeClass("ui-state-disabled");
    			    break;
    		}
        		
        }
        	
        	
      
     };
        
        var populateResetButtonState = function(tablesData){
        	
        	var number_of_tables = 16,
        	    created_tables = 0;
        	tablesData.forEach(function(tableData){
        		
        		if(tableData.created){
        			
        			created_tables++;
        		}
        		
        	});
        	
        	number_of_tables == created_tables ? $("#reset_system").removeClass("ui-state-disabled") : "";
        	
        };
        
      var populateMainButtonsState = function(tablesData){
        	
        	tablesData.forEach(function(tableData){
        		
        		if(tableData.created){
        			var $create_tables = $("#create_tables");
        			$create_tables.addClass("ui-state-disabled");
        			$("#reset_system").removeClass("ui-state-disabled");
        			
        			if(tableData.samples_added){
        				var $add_samples = $("#add_samples");
        				$add_samples.addClass("ui-state-disabled");
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
        	
        	$that.addClass("ui-state-disabled");
        	
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
			$(this).addClass("ui-state-disabled");
			
			e.preventDefault();
	
		});
		
		socket.on("tables_table_created",function(){
			
			socket.emit("create_tables");
			console.log("Create tables emitted");
			
		});
		
		
			$("#reset_system").on("click",function(e){
			 
				socket.emit("reset_system");
				$(this).addClass("ui-state-disabled");
			
				e.preventDefault();
			});
		
	
		
		socket.on("system_reset",function(){
			
			socket.emit("get_database_content");
			
		});
		
		socket.on("system_reset_error",function(){
			
			$("#reset_system").removeClass("ui-state-disabled");
			
		});
		
		
		// city socket listeners
		
		socket.on("city_created",function(){
			
			$("#city_created").html("Yes");
			$("#delete_city_table").removeClass("ui-state-disabled");
			$("#add_sample_cities").removeClass("ui-state-disabled");
			
		});
		
		
		socket.on("create_table_city_error",function(){
			
			var $create_city_table = $("#create_city_table");
				$create_city_table.removeAttr("disabled");
	
		});
		
		socket.on("table_city_deleted",function(){
			
			$("#city_created").text("No");
			$("#create_city_table").removeClass("ui-state-disabled");
			$("#add_sample_cities").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_city_error",function(){
			
			$("#delete_city_table").removeClass("ui-state-disabled");
			$("#city_error_message").text("Error deleting city table");
			
		});
		
		socket.on("table_city_emptied",function(){
				
			$("#sample_cities_added").text("No");
			$("#add_sample_cities").removeClass("ui-state-disabled");
			$("#delete_city_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_city_error",function(){
			
			$("#empty_city_table").removeClass("ui-state-disabled");
			$("#city_error_message").text("Error emptying city table");
			
		});
		
		// photographers socket listeners

		socket.on("photographers_created",function(){
			$("#photographers_created").html("Yes");
			$("#delete_photographers_table").removeClass("ui-state-disabled");
			$("#add_sample_photographers").removeClass("ui-state-disabled");
		
		});
		
		
		socket.on("create_table_photographers_error",function(){
			
			var $create_photographers_table = $("#create_photographers_table");
				$create_photographers_table.removeClass("ui-state-disabled");
				
		});
		
		
		socket.on("table_photographers_deleted",function(){
			
			$("#photographers_created").text("No");
			$("#sample_photographers_added").text("No");
			$("#create_photographers_table").removeClass("ui-state-disabled");
			$("#add_sample_photographers").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_photographers_error",function(){
			
			$("#delete_photographers_table").removeAttr("disabled");
			$("#photographers_error_message").text("Error deleting photographers table");
			
		});
		
		socket.on("table_photographers_emptied",function(){
				
			$("#sample_photographers_added").text("No");
			$("#add_sample_photographers").removeClass("ui-state-disabled");
			$("#delete_photographers_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_photographers_error",function(){
			
			$("#empty_photographers_table").removeClass("ui-state-disabled");
			$("#photographers_error_message").text("Error emptying photographers table");
			
		});
		
		
		// areas socket listeners

		socket.on("areas_created",function(){
			
			$("#areas_created").html("Yes");
			$("#delete_areas_table").removeClass("ui-state-disabled");
			$("#add_sample_areas").removeClass("ui-state-disabled");
			
		});
		
		
		
		socket.on("create_table_areas_error",function(){
			
			var $created_areas_table = $("#create_areas_table");
				$created_areas_table.removeClass("ui-state-disabled");
			
		});
		
		
		
		socket.on("table_areas_deleted",function(){
			
			$("#areas_created").text("No");
			$("#sample_areas_added").text("No");
			$("#create_areas_table").removeClass("ui-state-disabled");
			$("#add_sample_areas").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_areas_error",function(){
			
			$("#delete_areas_table").removeClass("ui-state-disabled");
			$("#areas_error_message").text("Error deleting areas table");
			
		});
		
		socket.on("table_areas_emptied",function(){
				
			$("#sample_areas_added").text("No");
			$("#add_sample_areas").removeClass("ui-state-disabled");
			$("#delete_areas_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_areas_error",function(){
			
			$("#empty_areas_table").removeClass("ui-state-disabled");
			$("#areas_error_message").text("Error emptying areas table");
			
		});
		
		
		
		// packages socket listeners

		socket.on("packages_created",function(){
			
			$("#packages_created").html("Yes");
			$("#delete_packages_table").removeClass("ui-state-disabled");
			$("#add_sample_packages").removeClass("ui-state-disabled");
			
		});
		
		
		socket.on("create_table_packages_error",function(){
			
			var $create_packages_table = $("#create_packages_table");
				$create_packages_table.removeClass("ui-state-disabled");
				
		});
		
		socket.on("table_packages_deleted",function(){
			
			$("#packages_created").text("No");
			$("#sample_packages_added").text("No");
			$("#create_packages_table").removeClass("ui-state-disabled");
			$("#add_sample_packages").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_packages_error",function(){
			
			$("#delete_packages_table").removeClass("ui-state-disabled");
			$("#packages_error_message").text("Error deleting packages table");
			
		});
		
		socket.on("table_packages_emptied",function(){
				
			$("#sample_packages_added").text("No");
			$("#add_sample_packages").removeClass("ui-state-disabled");
			$("#delete_packages_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_packages_error",function(){
			
			$("#empty_packages_table").removeClass("ui-state-disabled");
			$("#packages_error_message").text("Error emptying packages table");
			
		});
		
		
		// orders socket listeners

		socket.on("orders_created",function(){
			
			$("#orders_created").html("Yes");
			$("#delete_orders_table").removeClass("ui-state-disabled");
			$("#add_sample_orders").removeClass("ui-state-disabled");
			
		});
		
		
		socket.on("create_table_orders_error",function(){
			
			var $create_orders_table = $("#create_orders_table");
				$create_orders_table.removeClass("ui-state-disabled");
				
		});
		
		socket.on("table_orders_deleted",function(){
			
			$("#orders_created").text("No");
			$("#sample_orders_added").text("No");
			$("#create_orders_table").removeClass("ui-state-disabled");
			$("#add_sample_orders").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_orders_error",function(){
			
			$("#delete_orders_table").removeClass("ui-state-disabled");
			$("#orders_error_message").text("Error deleting orders table");
			
		});
		
		socket.on("table_orders_emptied",function(){
				
			$("#sample_orders_added").text("No");
			$("#add_sample_orders").removeClass("ui-state-disabled");
			$("#delete_orders_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_orders_error",function(){
			
			$("#empty_orders_table").removeClass("ui-state-disabled");
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
				$create_userIDs_table.removeClass("ui-state-disabled");
				
		});
		
		socket.on("table_userIDs_deleted",function(){
			
			$("#userIDs_created").text("No");
			$("#sample_userIDs_added").text("No");
			$("#create_userIDs_table").removeClass("ui-state-disabled");
			$("#add_sample_userIDs").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_userIDs_error",function(){
			
			$("#delete_userIDs_table").removeClass("ui-state-disabled");
			$("#userIDs_error_message").text("Error deleting userIDs table");
			
		});
		
		socket.on("table_userIDs_emptied",function(){
				
			$("#sample_userIDs_added").text("No");
			$("#add_sample_userIDs").removeClass("ui-state-disabled");
			$("#delete_userIDs_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_userIDs_error",function(){
			
			$("#empty_userIDs_table").removeClass("ui-state-disabled");
			$("#userIDs_error_message").text("Error emptying userIDs table");
			
		});
		
		
		// users socket listeners
		
		socket.on("users_created",function(){
			$("#users_created").html("Yes");
			$("#delete_users_table").removeClass("ui-state-disabled");
			$("#add_sample_users").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_users_error",function(){
			
			var $create_users_table = $("#create_users_table");
				$create_users_table.removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_users_deleted",function(){
			
			$("#users_created").text("No");
			$("#sample_users_added").text("No");
			$("#create_users_table").removeAttr("disabled");
			$("#add_sample_users").removeClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_users_error",function(){
			
			$("#delete_users_table").removeClass("ui-state-disabled");
			$("#users_error_message").text("Error deleting users table");
			
		});
		
		socket.on("table_users_emptied",function(){
				
			$("#sample_users_added").text("No");
			$("#add_sample_users").removeClass("ui-state-disabled");
			$("#delete_users_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_users_error",function(){
			
			$("#empty_users_table").removeClass("ui-state-disabled");
			$("#users_error_message").text("Error emptying users table");
			
		});
		
		
		// admin socket listeners
		
		socket.on("admin_created",function(){
			
			$("#admin_created").html("Yes");
			$("#delete_admin_table").removeClass("ui-state-disabled");
			$("#add_sample_admin").removeClass("ui-state-disabled");
	
		});
		
		socket.on("create_table_admin_error",function(){
			
			var $create_admin_table = $("#create_admin_table");
				$create_admin_table.removeClass("ui-state-disabled");
				
		});
		
		socket.on("table_admin_deleted",function(){
			
			$("#admin_created").text("No");
			$("#sample_admin_added").text("No");
			$("#create_admin_table").removeClass("ui-state-disabled");
			$("#add_sample_admin").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_admin_error",function(){
			
			$("#delete_admin_table").removeClass("ui-state-disabled");
			$("#admin_error_message").text("Error deleting admin table");
			
		});
		
		socket.on("table_admin_emptied",function(){
				
			$("#sample_admin_added").text("No");
			$("#add_sample_admin").removeClass("ui-state-disabled");
			$("#delete_admin_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_admin_error",function(){
			
			$("#empty_admin_table").removeClass("ui-state-disabled");
			$("#admin_error_message").text("Error emptying rights table");
			
		});
		
		
		// admin_rights socket listeners
		
		socket.on("admin_rights_created",function(){
			
			$("#admin_rights_created").html("Yes");
			$("#delete_admin_rights_table").removeClass("ui-state-disabled");
			$("#add_sample_admin_rights").removeClass("ui-state-disabled");
			
			});
		
		socket.on("create_table_admin_rights_error",function(){
			
			var $create_admin_rights_table = $("#create_admin_rights_table");
				$create_admin_rights_table.removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_admin_rights_deleted",function(){
			
			$("#admin_rights_created").text("No");
			$("#sample_admin_rights_added").text("No");
			$("#create_admin_rights_table").removeClass("ui-state-disabled");
			$("#add_sample_admin_rights").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_admin_rights_error",function(){
			
			$("#delete_admin_rights_table").removeClass("ui-state-disabled");
			$("#admin_rights_error_message").text("Error deleting admin rights table");
			
		});
		
		socket.on("table_admin_rights_emptied",function(){
				
			$("#sample_admin_rights_added").text("No");
			$("#add_sample_admin_rights").removeClass("ui-state-disabled");
			$("#delete_admin_rights_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_admin_rights_error",function(){
			
			$("#empty_admin_rights_table").removeClass("ui-state-disabled");
			$("#admin_rights_error_message").text("Error emptying admin rights table");
			
		});
		
		
		// alerts socket listeners
		
		socket.on("alerts_created",function(){
			
			$("#alerts_created").html("Yes");
			$("#delete_alerts_table").removeClass("ui-state-disabled");
			$("#add_sample_alerts").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_alerts_error",function(){
			
			var $create_alerts_table = $("#create_alerts_table");
				$create_alerts_table.removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_alerts_deleted",function(){
			
			$("#alerts_created").text("No");
			$("#sample_alerts_added").text("No");
			$("#create_alerts_table").removeClass("ui-state-disabled");
			$("#add_sample_alerts").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_alerts_error",function(){
			
			$("#delete_alerts_table").removeClass("ui-state-disabled");;
			$("#alerts_error_message").text("Error deleting alerts table");
			
		});
		
		socket.on("table_alerts_emptied",function(){
				
			$("#sample_alerts_added").text("No");
			$("#add_sample_alerts").removeClass("ui-state-disabled");
			$("#delete_alerts_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_alerts_error",function(){
			
			$("#empty_alerts_table").removeClass("ui-state-disabled");
			$("#alerts_error_message").text("Error emptying alerts table");
			
		});
		
		
		// delivery_method socket listeners
		
		socket.on("delivery_method_created",function(){
			
			$("#delivery_method_created").html("Yes");
			$("#delete_delivery_method_table").removeClass("ui-state-disabled");
			$("#add_sample_delivery_method").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_delivery_method_error",function(){
			
			var $create_delivery_method_table = $("#create_delivery_method_table");
				$create_delivery_method_table.removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_delivery_method_deleted",function(){
			
			$("#delivery_method_created").text("No");
			$("#sample_delivery_method_added").text("No");
			$("#create_delivery_method_table").removeClass("ui-state-disabled");
			$("#add_sample_delivery_method").addClass("ui-state-disabled")
			
		});
		
		socket.on("delete_table_delivery_method_error",function(){
			
			$("#delete_delivery_method_table").removeClass("ui-state-disabled");
			$("#delivery_method_error_message").text("Error deleting delivery method table");
			
		});
		
		socket.on("table_delivery_method_emptied",function(){
				
			$("#sample_delivery_method_added").text("No");
			$("#add_sample_delivery_method").removeClass("ui-state-disabled");
			$("#delete_delivery_method_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_delivery_method_error",function(){
			
			$("#empty_delivery_method_table").removeClass("ui-state-disabled");
			$("#delivery_method_error_message").text("Error emptying delivery method table");
			
		});
		
		
		// messages socket listeners
		
		socket.on("messages_created",function(){
			
			$("#messages_created").html("Yes");
			$("#delete_messages_table").removeClass("ui-state-disabled");
			$("#add_sample_messages_method").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_messages_error",function(){
			
			
			$("#create_messages_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_messages_deleted",function(){
			
			$("#messages_created").text("No");
			$("#sample_messages_added").text("No");
			$("#create_messages_table").removeClass("ui-state-disabled");
			$("#add_sample_messages").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_messages_error",function(){
			
			$("#delete_messages_table").removeClass("ui-state-disabled");
			$("#messages_error_message").text("Error deleting messages table");
			
		});
		
		socket.on("table_messages_emptied",function(){
				
			$("#sample_messages_added").text("No");
			$("#add_sample_messages").removeClass("ui-state-disabled");
			$("#delete_messages_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_messages_error",function(){
			
			$("#empty_messages_table").removeClass("ui-state-disabled");
			$("#messages_error_message").text("Error emptying messages table");
			
		});
		
		
		// reply_messages socket listeners
		
		socket.on("reply_messages_created",function(){
			$("#reply_messages_created").html("Yes");
			$("#delete_reply_messages_table").removeClass("ui-state-disabled");
			$("#add_sample_reply_messages_method").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_reply_messages_error",function(){
			
			$("#create_messages_table").removeAttr("disabled");
			
		});
		
		socket.on("table_reply_messages_deleted",function(){
			
			$("#reply_messages_created").text("No");
			$("#sample_reply_messages_added").text("No");
			$("#create_reply_messages_table").removeClass("ui-state-disabled");
			$("#add_sample_reply_messages").addClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_reply_messages_error",function(){
			
			$("#delete_reply_messages_table").removeClass("ui-state-disabled");
			$("#reply_messages_error_message").text("Error deleting reply messages table");
			
		});
		
		socket.on("table_reply_messages_emptied",function(){
				
			$("#sample_reply_messages_added").text("No");
			$("#add_sample_reply_messages").removeClass("ui-state-disabled");
			$("#delete_reply_messages_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_reply_messages_error",function(){
			
			$("#empty_reply_messages_table").removeClass("ui-state-disabled");
			$("#reply_messages_error_message").text("Error emptying reply messages table");
			
		});
		
		
		// message_attachments socket listeners
		
		socket.on("message_attachments_created",function(){
			$("#message_attachments_created").html("Yes");
			$("#delete_message_attachments_table").removeClass("ui-state-disabled");
			$("#add_sample_message_attachments_method").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_message_attachments_error",function(){
			
			
			$("#create_message_attachments_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_message_attachments_deleted",function(){
			
			$("#message_attachments_created").text("No");
			$("#sample_message_attachments_added").text("No");
			$("#create_message_attachments_table").removeClass("ui-state-disabled");
			$("#add_sample_message_attachments").removeClass("ui-state-disabled");
			
		});
		
		socket.on("delete_table_message_attachments_error",function(){
			
			$("#delete_message_attachments_table").removeClass("ui-state-disabled");
			$("#message_attachments_error_message").text("Error deleting message attachments table");
			
		});
		
		socket.on("table_message_attachments_emptied",function(){
				
			$("#sample_message_attachments_added").text("No");
			$("#add_sample_message_attachments").removeClass("ui-state-disabled");
			$("#delete_message_attachments_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_message_attachments_error",function(){
			
			$("#empty_message_attachments_table").removeClass("ui-state-disabled");
			$("#message_attachments_error_message").text("Error emptying message attachments table");
			
		});
		
		
		// catcha_images socket listeners
		
		socket.on("catcha_images_created",function(){
			$("#catcha_images_created").html("Yes");
			$("#delete_catcha_images_table").removeClass("ui-state-disabled");
			$("#add_sample_catcha_images_method").removeClass("ui-state-disabled");
		
		});
		
		socket.on("create_table_catcha_images_error",function(){
			
			
			$("#create_catcha_images_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("table_catcha_images_deleted",function(){
			
			$("#catcha_images_created").text("No");
			$("#sample_catcha_images_added").text("No");
			$("#create_catcha_images_table").removeClass("ui-state-disabled");
			$("#add_sample_catcha_images").attr("disabled","disabled");
			
		});
		
		socket.on("delete_table_catcha_images_error",function(){
			
			$("#delete_catcha_images_table").removeClass("ui-state-disabled");
			$("#catcha_images_error_message").text("Error deleting message attachments table");
			
		});
		
		socket.on("table_catcha_images_emptied",function(){
				
			$("#sample_catcha_images_added").text("No");
			$("#add_sample_catcha_images").removeClass("ui-state-disabled");
			$("#delete_catcha_images_table").removeClass("ui-state-disabled");
			
		});
		
		socket.on("empty_table_catcha_images_error",function(){
			
			$("#empty_catcha_images_table").removeClass("ui-state-disabled");
			$("#catcha_images_error_message").text("Error emptying catcha images table");
			
		});
		
		
		
		$(".photographers_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_photographers_table": $("#reset_system").addClass("ui-state-disabled");
												   disableAllOperationsButton($(this));
												   socket.emit("create_photographers_table");
					break;
				case "add_sample_photographers":  $("#add_samples").addClass("ui-state-disabled");
												  disableAllOperationsButton($(this));
												  socket.emit("add_sample_photographers");
					break;
				case "delete_photographers_table": $("#add_samples").addClass("ui-state-disabled");
												   $("#reset_system").addClass("ui-state-disabled");
												   disableAllOperationsButton($(this));
												   socket.emit("delete_photographers_table");
					break;
				case "empty_photographers_table": disableAllOperationsButton($(this));
												  socket.emit("empty_photographers_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".areas_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_areas_table": 	$("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										    socket.emit("create_areas_table");
					break;
				case "add_sample_areas":  $("#add_samples").addClass("ui-state-disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_areas");
					break;
				case "delete_areas_table": $("#add_samples").addClass("ui-state-disabled");
										   $("#reset_system").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("delete_areas_table");
					break;
				case "empty_areas_table": disableAllOperationsButton($(this));
										  socket.emit("empty_areas_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".city_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_city_table": 	$("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										    socket.emit("create_city_table");
					break;
				case "add_sample_cities":  $("#add_samples").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("add_sample_cities");
					break;
				case "delete_city_table": $("#add_samples").addClass("ui-state-disabled");
										  $("#reset_system").addClass("ui-state-disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("delete_city_table");
					break;
				case "empty_city_table": disableAllOperationsButton($(this));
										 socket.emit("empty_city_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".packages_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_packages_table": $("#reset_system").addClass("ui-state-disabled");
											  disableAllOperationsButton($(this));
										      socket.emit("create_packages_table");
					break;
				case "add_sample_packages":  $("#add_samples").addClass("ui-state-disabled");
											 disableAllOperationsButton($(this));
										  	 socket.emit("add_sample_packages");
					break;
				case "delete_packages_table": $("#add_samples").addClass("ui-state-disabled");
											  $("#reset_system").addClass("ui-state-disabled");
											  disableAllOperationsButton($(this));
										   	  socket.emit("delete_packages_table");
					break;
				case "empty_packages_table": disableAllOperationsButton($(this));
										  	 socket.emit("empty_packages_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".orders_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_orders_table": $("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										    socket.emit("create_orders_table");
					break;
				case "add_sample_orders":  $("#add_samples").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("add_sample_orders");
					break;
				case "delete_orders_table": $("#add_samples").addClass("ui-state-disabled");
											$("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										   	socket.emit("delete_orders_table");
					break;
				case "empty_orders_table": disableAllOperationsButton($(this));
										   socket.emit("empty_orders_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".delivery_method_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_delivery_method_table": $("#reset_system").addClass("ui-state-disabled");
													 disableAllOperationsButton($(this));
										      		 socket.emit("create_delivery_method_table");
					break;
				case "add_sample_delivery_method":  $("#add_samples").addClass("ui-state-disabled");
												    disableAllOperationsButton($(this));
												    socket.emit("add_sample_delivery_method");
					break;
				case "delete_delivery_method_table": $("#add_samples").addClass("ui-state-disabled");
													 $("#reset_system").addClass("ui-state-disabled");
													 disableAllOperationsButton($(this));
													 socket.emit("delete_delivery_method_table");
					break;
				case "empty_delivery_method_table": disableAllOperationsButton($(this));
													socket.emit("empty_delivery_method_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".userIDs_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_userIDs_table": $("#reset_system").addClass("ui-state-disabled");
											 disableAllOperationsButton($(this));
										     socket.emit("create_userIDs_table");
					break;
				case "add_sample_userIDs":  $("#add_samples").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										  	socket.emit("add_sample_userIDs");
					break;
				case "delete_userIDs_table": $("#add_samples").addClass("ui-state-disabled");
											 $("#reset_system").addClass("ui-state-disabled");
											 disableAllOperationsButton($(this));
										   	 socket.emit("delete_userIDs_table");
					break;
				case "empty_userIDs_table": disableAllOperationsButton($(this));
										  	socket.emit("empty_userIDs_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".users_btnDB_operations").on("click",function(e){
			 
			var id = $(this).attr("id");
			switch(id.toString()){
				case "create_users_table": $("#reset_system").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("create_users_table");
					break;
				case "add_sample_users":  $("#add_samples").addClass("ui-state-disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_users");
					break;
				case "delete_users_table": $("#add_samples").addClass("ui-state-disabled");
										   $("#reset_system").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("delete_users_table");
					break;
				case "empty_users_table": disableAllOperationsButton($(this));
										  socket.emit("empty_users_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".admin_btnDB_operations").on("click",function(e){
			 
			var id = $(this).attr("id");
			switch(id.toString()){
				case "create_admin_table": $("#reset_system").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("create_admin_table");
					break;
				case "add_sample_admin":  $("#add_samples").addClass("ui-state-disabled");
										  disableAllOperationsButton($(this));
										  socket.emit("add_sample_admin");
					break;
				case "delete_admin_table": $("#add_samples").addClass("ui-state-disabled");
										   $("#reset_system").addClass("ui-state-disabled");
										   disableAllOperationsButton($(this));
										   socket.emit("delete_admin_table");
					break;
				case "empty_admin_table": disableAllOperationsButton($(this));
										  socket.emit("empty_admin_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".admin_rights_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			 console.log(id);
			switch(id.toString()){
				case "create_admin_rights_table":  $("#reset_system").addClass("ui-state-disabled");
												   disableAllOperationsButton($(this));
												   socket.emit("create_admin_rights_table");
					break;
				case "add_sample_admin_rights":   $("#add_samples").addClass("ui-state-disabled");
												  disableAllOperationsButton($(this));
										  		  socket.emit("add_sample_admin_rights");
					break;
				case "delete_admin_rights_table": $("#add_samples").addClass("ui-state-disabled");
												  $("#reset_system").addClass("ui-state-disabled");
												  disableAllOperationsButton($(this));
										   	  	  socket.emit("delete_admin_rights_table");
					break;
				case "empty_admin_rights_table":  disableAllOperationsButton($(this));
										  	  	  socket.emit("empty_admin_rights_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".alerts_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_alerts_table":	$("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										    socket.emit("create_alerts_table");
					break;
				case "add_sample_alerts": 	disableAllOperationsButton($(this));
											$("#add_samples").addClass("ui-state-disabled");
										  	socket.emit("add_sample_alerts");
					break;
				case "delete_alerts_table": $("#add_samples").addClass("ui-state-disabled");
											$("#reset_system").addClass("ui-state-disabled");
											disableAllOperationsButton($(this));
										   	socket.emit("delete_alerts_table");
					break;
				case "empty_alerts_table": disableAllOperationsButton($(this));
										   socket.emit("empty_alerts_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		
		$(".messages_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_messages_table": $("#reset_system").addClass("ui-state-disabled");
											  disableAllOperationsButton($(this));
										      socket.emit("create_messages_table");
					break;
				case "add_sample_messages":  disableAllOperationsButton($(this));
											 $("#add_samples").addClass("ui-state-disabled");
										  	 socket.emit("add_sample_reply_messages");
					break;
				case "delete_messages_table": $("#add_samples").addClass("ui-state-disabled");
											  $("#reset_system").addClass("ui-state-disabled");
											  disableAllOperationsButton($(this));
										   	  socket.emit("delete_messages_table");
					break;
				case "empty_messages_table": disableAllOperationsButton($(this));
										     socket.emit("empty_messages_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		
		$(".reply_messages_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_reply_messages_table": $("#reset_system").addClass("ui-state-disabled");
											  		disableAllOperationsButton($(this));
											  		socket.emit("create_reply_messages_table");
					break;
				case "add_sample_reply_messages":  disableAllOperationsButton($(this));
											       $("#add_samples").addClass("ui-state-disabled");
										  	       socket.emit("add_sample_reply_messages");
					break;
				case "delete_reply_messages_table":	$("#add_samples").addClass("ui-state-disabled");
											  		$("#reset_system").addClass("ui-state-disabled");
											  		disableAllOperationsButton($(this));
											  		socket.emit("delete_reply_messages_table");
					break;
				case "empty_reply_messages_table": disableAllOperationsButton($(this));
										     	   socket.emit("empty_reply_messages_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		
		$(".message_attachments_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_message_attachments_table": $("#reset_system").addClass("ui-state-disabled");
											  			 disableAllOperationsButton($(this));
											  			 socket.emit("create_message_attachments_table");
					break;
				case "add_sample_message_attachments":  disableAllOperationsButton($(this));
														$("#add_samples").addClass("ui-state-disabled");
														socket.emit("add_sample_message_attachments");
					break;
				case "delete_message_attachments_table": $("#add_samples").addClass("ui-state-disabled");
											  			 $("#reset_system").addClass("ui-state-disabled");
											  			 disableAllOperationsButton($(this));
											  			 socket.emit("delete_message_attachments_table");
					break;
				case "empty_message_attachments_table": disableAllOperationsButton($(this));
										     			socket.emit("empty_message_attachments_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		$(".catcha_images_btnDB_operations").on("click",function(e){
			 var id = $(this).attr("id");
			switch(id.toString()){
				case "create_catcha_images_table": 		 $("#reset_system").addClass("ui-state-disabled");
											  			 disableAllOperationsButton($(this));
											  			 socket.emit("create_catcha_images_table");
					break;
				case "add_sample_catcha_images":  		disableAllOperationsButton($(this));
														$("#add_samples").addClass("ui-state-disabled");
														socket.emit("add_sample_catcha_images");
					break;
				case "delete_catcha_images_table":		 $("#add_samples").addClass("ui-state-disabled");
											  			 $("#reset_system").addClass("ui-state-disabled");
											  			 disableAllOperationsButton($(this));
											  			 socket.emit("delete_catcha_images_table");
					break;
				case "empty_catcha_images_table":   	disableAllOperationsButton($(this));
										     			socket.emit("empty_catcha_images_table");
					break;
			
			}
			
			e.preventDefault();
		});
		
		
	$("#can_message").on("populate",function(e){
			
			$can_message = $(this);
			var options = "";
			[].forEach.call(e.tablesData,function(table){
				
				options += (["<option id='"+table.name+"'>",table.name,"</option>"].join(''));
			});
			$can_message.html(options);
			$("#submit_can_message").removeClass("ui-state-disabled");
			
		}).on("change",function(e){
			
			$("#submit_can_message").unbind("click");
			if($(this).val()){
				
					$("#can_message_selected").html($(this).val().join());
					$("#submit_can_message").on("click",{"can_message":$(this).val()},function(e){
						
						socket.emit("mark_as_messagable",JSON.stringify(e.data.can_message));
						e.preventDefault();
				});
			
			}
			
	});
	
	$("#current_messagable").on("populate",function(e){
		
		var $dd = $(this).find("dd");
		    $dd.html("");
		[].forEach.call(e.tablesData,function(table){
			if(table.can_message){
				
				$dd.append(["<p>",table.name,"</p>"].join(""));
			}
			
		});
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