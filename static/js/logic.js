//

 function nextLinkClicked(){
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
            
            
         
            
            /*
         // pre-populate client's information if exists
            try{
            	
            var client_details = JSON.parse(localStorage['client_details']);	
            var name = client_details.name,
                 phoneNumber = client_details.phone_number,
                 address = client_details.address,
                 directions = client_details.directions,
                 location = client_details.location;

                 
            $("#name").val(name);
            $("#number").val(phoneNumber);
            $("#address").val(address);
            $("#directions").val(directions);
            $("#location").val(location);
            
            }catch(ex){
            	
            	var client_details = {
            			name : "",
            			phone_number : "",
            			address : "",
            			directions : "",
            			location : ""
            	};
            	
            	localStorage['client_details'] = JSON.stringify(client_details);
            	
            	
            }*/