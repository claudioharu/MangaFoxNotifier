$(document).ready(function() {
	$("#searchterm").keyup(function(event){
		console.log("eu");
	    if(event.keyCode == 13){
	        $("#search").click();
	    }
	});
});