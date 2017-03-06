$(document).ready(function() {
	// Function to get input value.
	$('#search').click(function() {
		var text_value = $("#searchterm").val();
		if(text_value=='') {
			alert("Enter Some Text In Input Field");
		}else{
			// alert(text_value);
			$("#toRemove").remove();
			listSearch(text_value);
		}

		
	});
});