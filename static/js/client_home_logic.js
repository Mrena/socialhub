

var client_home = function(socket){
	
	
	try{
	
	var initNumberOfImages = function(){
		
		// populates quantity drop-down with values of 5 to 15
	    for (var i = 5; i < 16; i++)
	        $("#quantity").append("<option class='quantity1'>" + i + "</option>");
		
	};
	
	var initPackages = function(){
		
		socket.emit("get_packages");
		
	};
	
	
	socket.on("packages",function(packages) {

        packages = JSON.parse(packages);

            packages.forEach(function(obj_package){
            	 $("#printSize").append("<option id='"+obj_package.price+"'>"+obj_package.print_size+"</option>");
             });
        
           
                
             /*packages.forEach(function(obj_package){
            	 $("#printSize").append("<option id='"+obj_package.price+"'>"+obj_package.print_size+"</option>");
             });*/
            
        });
	
	var initCities = function(){
		
		socket.emit("get_cities");
		socket.on("cities", function (cities) {
			$("#location").html("<option>Select location</option>");
	        cities.forEach(function(city){
	        	
	        	$("#location").append("<option id='" + city + "'> + " + city + "</option>");
	        });
	    });
		
	};
	
	
	initCities();
	initPackages();
	initNumberOfImages();
	// start of home request and response
	$("#home").on("click",function(e){
		socket.emit("get_home");
		sessionStorage['current_view'] = "home_page";
		e.preventDefault();
		
	});
	
	socket.on("home",function(data){
	
			$("#page").html(data);
			initCities();
			initNumberOfImages();
			initPackages();

		
	});
	
	// end of home request and response
	
	}catch(error){
		
		console.log(error);
		
		var objError = {
				"error" : error.message,
				"file_name" : "client_home_logic.js",
				"line_number" : 1
		};
		
		socket.emit("log_system_error",JSON.stringify(objError));
		
	}
	
	
	
};


	