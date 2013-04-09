

	var client_create_database = function(socket){
	
		var created = 0,
		total = 6,
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

		socket.on("photographers_created",function(){
			$("#photographers_created").html("Yes");
			tables['photographers_created'] = "Yes";
			increamentAndSave();
		});

		socket.on("areas_created",function(){
			$("#areas_created").html("Yes");
			tables['areas_created'] = "Yes";
			increamentAndSave();
		});

		socket.on("packages_created",function(){
			$("#packages_created").html("Yes");
			tables['packages_created'] = "Yes";
			increamentAndSave();
		});

		socket.on("orders_created",function(){
			$("#orders_created").html("Yes");
			tables['orders_created'] = "Yes";
			increamentAndSave();
		});

		socket.on("userIDs_created",function(){
			$("#userIDs_created").html("Yes");
			tables['userIDs_created'] = "Yes";
			increamentAndSave();
	
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

	
	
};