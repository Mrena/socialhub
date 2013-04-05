

	var client_sample_data = function(socket){
	
	
		var added = 0,
		total = 5,
		samples;

		if(!localStorage['samples']){
			samples = {
					sample_photographers_added : "no",
					sample_cities_added : "no",
					sample_areas_added : "no",
					sample_packages_added : "no",
					sample_orders_added : "no",
					sample_userIDs_added : "no"
            	};
			localStorage['samples'] = JSON.stringify(samples);
    
		}else{
	
			samples = JSON.parse(localStorage['samples']);
			for(key in samples){
				$("#"+key).html(samples[key]);
				if(samples[key]=="Yes"){
					added++;
				}
			}
		}

	if(added==total){
		$("#add_samples").attr("disabled","disabled");
		}
	
	
	$("#add_samples").on("click",function(){
		
		socket.emit("add_sample_data");
		
	});
	
	socket.on("sample_orders_added",function(){
		
		$("#sample_orders_added").html("Yes");
		samples['sample_orders_added'] = "Yes";
		increamentAndSave();
		
	});


	socket.on("sample_photographers_added",function(){
		
		$("#sample_photographers_added").html("Yes");
		samples['sample_photographers_added'] = "Yes";
		increamentAndSave();
		
	});

	socket.on("sample_packages_added",function(){
		
		$("#sample_packages_added").html("Yes");
		samples['sample_packages_added'] = "Yes";
		increamentAndSave();
		
	});

	socket.on("sample_cities_added",function(){
		
		$("#sample_cities_added").html("Yes");
		samples['sample_cities_added'] = "Yes";
		increamentAndSave();
		
	});

	socket.on("sample_areas_added",function(){
		
		$("#sample_areas_added").html("Yes");
		samples['sample_areas_added'] = "Yes";
		increamentAndSave();
		
	});

	socket.on("sample_userIDs_added",function(){
		
		$("#sample_userIDs_added").html("Yes");
		samples['sample_userIDs_added'] = "Yes";
		increamentAndSave();
		
	});
	
	var isTotal = function(){
		if(added==total){
			$("#add_samples").attr("disabled","disabled");
			}
		};

	
	var increamentAndSave = function(){
		console.log("increamented");
		added++;
		isTotal();
		localStorage['samples'] = JSON.stringify(samples);
		};
	
	
};