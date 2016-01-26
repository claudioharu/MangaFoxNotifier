$(document).ready(function() {
	// Function to get input value.

	$('#roundedTwo').click(function() {
		if($('#roundedTwo').is(":checked")){
			console.log("marcado");
			$('#searchform').hide();
			// $('#toRemove').show();
			$('div.list').append('<div id="toRemove"></div>');
			$('#toRemove').append('<ul class="style1"></ul>');
			body();

		} else {
			console.log("n~ao marcado");
			$('#searchform').show();
			$('#toRemove').remove();
		
		}
		
	});
});