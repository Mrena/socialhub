

try{
		/*
		var event = $.event;
		var $selected = event.special.selected = {
				
				setup:function(data,namespaces){
					console.log(typeof this);
					event.add(this,'click',$selected.handler);
					return false;
				},
				teardown:function(namespaces){
					console.log(typeof this);
					event.remove(this,'click',$selected.handler);
					return false;
					
				},
				handler:function(){
					
					var $elem = $(this);
					if(!$elem.hasClass('ui-state-disabled')){
						$elem.triggerHandler('selected');
						
					}else{
						console.log($elem+" is disabled.");
					}
				}
		};
		
		*/
		
		}catch(e){
			console.log("Special Error: "+e);
		}
		