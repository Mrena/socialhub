/*
		var client_details;
		var	name = "";
		var	phoneNumber = "";
		var	address = "";
		var	directions = "";
		var	location = "";
*/

		var validateUserDetails = function(name,phone_number,address,directions){
			
					console.log("in validate");
			
					var isValid = true;
					var validate_name =  /^[a-z]([0-9a-z])+$/i;
					    if(!validate_name.test(name)){
					    	isValid = false;
					    	 $("#name").focus();
					    }
					    
					var validate_number = /^[0-9]/i;
					    if(!validate_number.test(phone_number)){
					    	isValid = false;
					    	$("#phone_number").focus();
					    }
					    
					var validate_address = /^[a-z]([0-9a-z])+$/i;
					    if(!validate_address.test(address)){
					    	isValid = false;
					    	$("#address").focus();
					    	
					    }
					    
					var validate_directions = /^[a-z]([0-9a-z])+$/i;
					    if(!validate_directions.test(directions)){
					    	isValid = false;
					    	$("#direction").focus();
					    	$("#direction").addClass("redborder_textfield");
					    }
					    
				   return isValid;
				};

       var nextLinkClicked = function(){
               // implements the next button for quantity drop-down
                var last = parseInt($(".quantity1:last").val());
                $("#quantity").empty();
                last++;
                var lastX10 = last + 10;
                for (var i = last; i < lastX10; i++) {
                    if (i == last)
                        $("#quantity").append("<option class='quantity1'>Select quantity</option>");
                    $("#quantity").append("<option class='quantity1'>" + i + "</option>");
                }
                $("#range").remove();
                $(this).after(" <span id='range'>" + last + "-" + (lastX10 - 1) + "</span>"); 

            };
            
            
         
            
            
         // pre-populate client's information if exists
          /*  try{
            	
            	 client_details = JSON.parse(localStorage['client_details']);	
                 name = client_details.name;
                 phoneNumber = client_details.phone_number;
                 address = client_details.address;
                 directions = client_details.directions;
                 location = client_details.location;

                 
            $("#name").val(name);
            $("#number").val(phoneNumber);
            $("#address").val(address);
            $("#directions").val(directions);
            $("#location").val(location);
            
            }catch(ex){
            	
            	 client_details = {
            			name : "",
            			phone_number : "",
            			address : "",
            			directions : "",
            			location : ""
            	};
            	
            	localStorage['client_details'] = JSON.stringify(client_details);
            	
            	
            }
            */
            
            $("#save").on("click",function(e){
            	  	
            		console.log("is valid clicked");
            		
            	    name = $.trim($("#name").val());
                	number = $.trim($("#number").val());
                	address = $.trim($("#address").val());
                	directions = $.trim($("#directions").val());
                	location = $.trim($("#location").val());
            	
            	
            	if(validateUserDetails(name,number,address,directions,location)){
            			
            		console.log("valid details");
            		/*
            		  client_details = {
                			"name" : name,
                			"phone_number" : number,
                			"address" : address,
                			"directions" : directions,
                			"location" : location
                		};
                	
                	localStorage['client_details'] = JSON.stringify(client_details);
            		*/
            		}
            	
            	e.preventDefault();
            	
            });