$(document).ready(function() {
	$("#searchterm").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#search").click();
	    }
	});
});