
var indexPage = "";

$(document).ready(function () {
    indexPage = $("#page").html();


    $("h1").mouseover(function () {
        $(this).css("color", "teal");
    }).mouseout(function () {
        $(this).css("color", "black");
    });



});




$("a").hover(function () {
    // do this on mouse over
    $(this).css("color", "lime");
}, function () {
    // do this on mouse out
    $(this).css("color", "teal");
});

(function(){
	
	$(document).on("show_loading",function(){
		console.log(this);
		console.log("Showing loading...");
		$("body").css("opacity",0.4);
		$("<div id='loading'><b>Loading...</b></div>").appendTo("body");
		
	}).on("hide_loading",function(){
		console.log("Hiding loading...");
		$("body").css("opacity",1);
		$("#loading").remove();
	});
	
	
	
})();