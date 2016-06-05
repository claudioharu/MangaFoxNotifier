$(document).ready(function() {

	var linksToWatch = [];
	
	$("input[name='checkMangas']").each(function( index ) {
	    console.log( index + ":" +$( this ).attr('id'));
	    $("[id='"+$( this ).attr('id')+"']").click(function() {
			if($("[id='"+$( this ).attr('id')+"']").is(":checked")){
				var latestMangaToSaveLink = itensLinks[index];
				var latestMangaToSave =  $( this ).attr('id');
				console.log(itensLinks[index]);
				console.log("#"+$( this ).attr('id')+" marcado");

				chrome.storage.sync.get("listOfMangasToSave", function(dat){

					var arrayOfMangas = [];
					if($.isArray(dat.listOfMangasToSave))
						arrayOfMangas = dat.listOfMangasToSave;

					arrayOfMangas.unshift(latestMangaToSave);
					// console.log(arrayOfMangas);
					chrome.storage.sync.set({"listOfMangasToSave" : arrayOfMangas}, function(){
						console.log("salvou ");
						// console.log(arrayOfMangas);
					});
				});

				chrome.storage.sync.get("listOfMangasToSaveLinks", function(datLinks){

					var arrayOfMangasLinks = [];
					if($.isArray(datLinks.listOfMangasToSaveLinks))
						arrayOfMangasLinks = datLinks.listOfMangasToSaveLinks;

					arrayOfMangasLinks.unshift(latestMangaToSaveLink);
					chrome.storage.sync.set({"listOfMangasToSaveLinks" : arrayOfMangasLinks}, function(){
						console.log("salvou links");
						// console.log(arrayOfMangasLinks);
					});
				});
				

			}
		});
	});
});