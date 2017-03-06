var itens = [];
var itensLinks = [];

$(function(){
	body();	
	// setInterval(body, 1800000);
});



function body(){

console.log("fui chamado");		
$.get('http://mangafox.me/directory/?latest', function(data){
		var htmlData = data;
		$data = $(htmlData).find( "ul.list" ).find("li");
		$('ul.style1').append($data);
	});
}


function listSearch(title)
{
	console.log("galo");
	$("div#toRemove").remove();

	
	$('div.list').append('<div id="toRemove"></div>');
	$('#toRemove').append('<ul class="style1"></ul>');
	link = "http://mangafox.me/search.php?name_method=cw&name=" + title + "&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"
	$.ajax({
		async: false,
		type: 'GET',
		url: link,
		success: function(datat) {
			
			var html = datat;
			$data = $(html).find('#mangalist').find(".list").find("li");
			
			itens = [];
			itensLinks = [];

			console.log($data.length);
			for(i=0; i < $data.length; i++)
			{
				itens[i] = $data.eq(i).find('a.title').eq(0).text();
				itensLinks[i] = $data.eq(i).find('.manga_img').eq(0).attr('href');
				
			}
			// console.log(itens);
			// console.log(itensLinks);

			chrome.storage.sync.get("listOfMangasToSave", function(dat){

				console.log(dat.listOfMangasToSave);
				for(i=0; i < itens.length; i++)
				{
					console.log();
					if($.inArray(itens[i], dat.listOfMangasToSave) != -1){
						console.log($.inArray(itens[i], dat.listOfMangasToSave));
						aux = '<input type="checkbox" checked name="checkMangas" id ="'+ itens[i]+'"/>';
					}
					else{
						aux = '<input type="checkbox" name="checkMangas" id ="'+ itens[i]+'"/>';
					}
					$('ul.style1').append('<li> <div style="float:left; width:45%; "> <a href="'+itensLinks[i]+'" >' + itens[i] + '</a></div>'
						+'<div id="mangasCheckBox" style="float:right; width:45%;   position: relative; top: -15px;" >'
						+'<section title=".squaredTwo" style="position: absolute;" >'
						+'<div class="squaredTwo">'
						+ aux
						+'<label for="'+ itens[i]+'"></label>'
						+'</div>'
						+'</li>'
						+'</section>'
						+'</div>');	


				}

			});

			// $('#toRemove').append($);
			if($('script[src="registerMangasChecked.js"]').length < 1)
			{
				create();
			}
			else
			{
				$('script[src="registerMangasChecked.js"]').remove();
				create();

			}
		}
	});
}


function create(){
	var script = document.createElement('script');
	script.src = 'registerMangasChecked.js';
	document.head.appendChild(script);
}