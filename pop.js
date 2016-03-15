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
	var itens = [];
	$('div.list').append('<div id="toRemove"></div>');
	$('#toRemove').append('<ul class="style1"></ul>');
	link = "http://mangafox.me/search.php?name_method=cw&name=" + title + "&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"
	$.ajax({
		async: false,
		type: 'GET',
		url: link,
		success: function(datat) {
			
			var html = datat;
			$data = $(html).find('#listing').find("tr");
			
			console.log($data.length);
			for(i=1; i < $data.length; i++)
			{
				itens[i-1] = $data.eq(i).find('td').find('a').eq(0).text();
				
			}

			for(i=0; i < itens.length; i++)
			{
				 $('ul.style1').append('<li> <div float:left> <a >' + itens[i] + '</a></div>'+ 
				 	'<section title=".squaredTwo"><div class="squaredTwo" float:right>'+
				 	'<input type="checkbox" value="None" name="check" id ="'+ itens[i]+'"/>'+
				 	'<label for="'+ itens[i]+'"></label>'+
				 	'</div>'+
				 	'</li></section>');	
			}
			// $('#toRemove').append($);
		}
	});
}

// <div class="squaredTwo"> -->
// 		<!-- <input type="checkbox" value="None" id="squaredTwo" name="check" checked /> -->
// 		<!-- <label for="squaredTwo"></label> -->
// 		<!-- </div> -->