

	var client_create_database = function(socket){
		
		try{
	
		var created = 0,
		total = 9,
		tables;

		if(!localStorage['tables']){
			tables = {
					photographers_created : "no",
					city_created : "no",
					areas_created : "no",
					packages_created : "no",
					orders_created : "no",
					userIDs_created : "no"
            	};
			localStorage['tables'] = JSON.stringify(tables);
    
		}else{
	
			tables = JSON.parse(localStorage['tables']);
			for(key in tables){
				$("#"+key).html(tables[key]);
				if(tables[key]=="Yes"){
					created++;
				}
			}
		}

		if(created==total){
			$("#create_tables").attr("disabled","disabled");
		}

		socket.emit("startup");

		$("#submit_database_name").on("click",function(){
	
			var database_name = $.trim($("#database_name").val());
				if(database_name!="")
					socket.emit("create_database",database_name);
			});


		$("#create_tables").on("click",function(){
	
			socket.emit("create_tables");
	
			});
		
		

		socket.on("city_created",function(){
			$("#city_created").html("Yes");
			tables['city_created'] = "Yes";
			increamentAndSave();
			});
		
		socket.on("create_table_city_error",function(){
			
			
			
		});

		socket.on("photographers_created",function(){
			$("#photographers_created").html("Yes");
			tables['photographers_created'] = "Yes";
			increamentAndSave();
		});
		
		socket.on("create_table_photographers_error",function(){
			
			
			
			
		});

		socket.on("areas_created",function(){
			$("#areas_created").html("Yes");
			tables['areas_created'] = "Yes";
			increamentAndSave();
		});
		
		socket.on("create_table_areas_error",function(){
			
			
			
		});

		socket.on("packages_created",function(){
			$("#packages_created").html("Yes");
			tables['packages_created'] = "Yes";
			increamentAndSave();
		});
		
		socket.on("create_table_packages_error",function(){
			
			
			
		});

		socket.on("orders_created",function(){
			$("#orders_created").html("Yes");
			tables['orders_created'] = "Yes";
			increamentAndSave();
		});
		
		socket.on("create_table_orders_error",function(){
			
			
			
			
		});

		socket.on("userIDs_created",function(){
			$("#userIDs_created").html("Yes");
			tables['userIDs_created'] = "Yes";
			increamentAndSave();
	
			});
		
		socket.on("create_table_userids_error",function(){
			
			
			
			
		});
		
		socket.on("users_created",function(){
			$("#users_created").html("Yes");
			tables['users_created'] = "Yes";
			increamentAndSave();
	
			});
		
		socket.on("create_table_users_error",function(){
			
			
			
			
		});
		
		socket.on("admin_created",function(){
			$("#admin_created").html("Yes");
			tables['admin_created'] = "Yes";
			increamentAndSave();
	
			});
		
		socket.on("create_table_admin_error",function(){
			
			
			
			
		});
		
		socket.on("admin_right_created",function(){
			$("#admin_rights_created").html("Yes");
			tables['admin_rights_created'] = "Yes";
			increamentAndSave();
	
			});
		
		socket.on("create_table_admin_rights_error",function(){
			
			
			
			
		});
		
		socket.on("alerts_created",function(){
			$("#alerts_created").html("Yes");
			tables['alerts_created'] = "Yes";
			increamentAndSave();
	
			});
		
		socket.on("create_table_alerts_error",function(){
			
			
			
			
		});
		

		var isTotal = function(){
			if(created==total){
				$("#create_tables").attr("disabled","disabled");
			}
		};

		var increamentAndSave = function(){

			created++;
			isTotal();
			localStorage['tables'] = JSON.stringify(tables);
		};
		
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