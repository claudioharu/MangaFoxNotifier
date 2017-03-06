$(document).ready(function() {

	var linksToWatch = [];
	//Salvando Mangas Quando o check estiver setado
	$("input[name='checkMangas']").each(function( index ) {
	    console.log( index + ":" +$( this ).attr('id'));
	    $("[id='"+$( this ).attr('id')+"']").click(function() {
			if($("[id='"+$( this ).attr('id')+"']").is(":checked")){
				var latestMangaToSaveLink = itensLinks[index];
				var latestMangaToSave =  $( this ).attr('id');
				console.log(itensLinks[index]);
				console.log("#"+$( this ).attr('id')+" marcado");

				
				//Salvando a lista de mangas para verificar os ultimos capitulos
				chrome.storage.sync.get("listOfMangasToSave", function(dat){

					var arrayOfMangas = [];
					if($.isArray(dat.listOfMangasToSave))
						arrayOfMangas = dat.listOfMangasToSave;

					arrayOfMangas.unshift(latestMangaToSave);
					// console.log(arrayOfMangas);
					chrome.storage.sync.set({"listOfMangasToSave" : arrayOfMangas}, function(){
						console.log("salvou ");
						console.log(arrayOfMangas);
					});
				});

				chrome.storage.sync.get("listOfMangasToSaveLinks", function(datLinks){

					var arrayOfMangasLinks = [];
					if($.isArray(datLinks.listOfMangasToSaveLinks))
						arrayOfMangasLinks = datLinks.listOfMangasToSaveLinks;

					arrayOfMangasLinks.unshift(latestMangaToSaveLink);
					chrome.storage.sync.set({"listOfMangasToSaveLinks" : arrayOfMangasLinks}, function(){
						console.log("salvou links");
						console.log(arrayOfMangasLinks);
					});
				});
				

			}
		});
	});


	// Removendo os mangas quando o check nao estiver setado
	$("input[name='checkMangas']").each(function( index ) {
	    // console.log( index + ":" +$( this ).attr('id'));
	    $("[id='"+$( this ).attr('id')+"']").click(function() {
			if(!$("[id='"+$( this ).attr('id')+"']").is(":checked")){

				var latestMangaToSaveLink = itensLinks[index];
				var latestMangaToSave =  $( this ).attr('id');

				chrome.storage.sync.get("listOfMangasToSave", function (obj) {
    				console.log(obj);
    				if(obj.listOfMangasToSave.length > 0)
    				{
    					var id = obj.listOfMangasToSave.indexOf(latestMangaToSave);
    				}
    				else
    					id = -1;
    				
    				console.log(id);
    				if (id > -1) {
	    				obj.listOfMangasToSave.splice(id, 1);
	    			}
	    			else
	    				obj.listOfMangasToSave = [];

					chrome.storage.sync.set({"listOfMangasToSave" : obj.listOfMangasToSave}, function(){
						console.log("salvou ");
							// console.log(arrayOfMangas);
					});
				
						
				});

				chrome.storage.sync.get("listOfMangasToSaveLinks", function(obj){

					console.log(obj);
					if(obj.listOfMangasToSaveLinks.length>0)
    					var id = obj.listOfMangasToSaveLinks.indexOf(latestMangaToSaveLink);
    				else
    					id = -1;

    				console.log(id);
    				if (id > -1) {	
    					obj.listOfMangasToSaveLinks.splice(id, 1);
    				}
    				else
    					obj.listOfMangasToSaveLinks = [];
					chrome.storage.sync.set({"listOfMangasToSaveLinks" : obj.listOfMangasToSaveLinks}, function(){
						console.log("salvou ");
							// console.log(arrayOfMangas);
					});
									
				});

			}
		});
	});
});