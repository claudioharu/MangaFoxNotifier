
var mangaDate = [];
var mangaLink = [];
var manga = [];
// var mangaImg = [];
var latestManga;
var latestImg;

var previousManga = [];



$(function(){
	debug();
	engine();
	setInterval(engine, 60000);
});

function debug()
{
	// chrome.storage.sync.set({"latestManga" : ["Dagashi Kashi 19", "latestImg"]}, function(){
	// 	console.log("salvou " + "Dagashi Kashi 19" + " " + "latestImg");
	// });
	// latestManga = "My Young Cat and My Old Dog 185";
}

function engine(){

	var newManga = [];
	var newImg = [];
	$.get('http://mangafox.me/releases/', function(data){
			var htmlData = data;
			$data = $(htmlData).find( "ul#updates" );

			for (i = 0; i < 10; i++){
				manga[i] = $data.find('a.series_preview.manga_open').eq(i).text();
				mangaDate[i] = $data.find('li').eq(i).find('dt').eq(0).find('a.chapter').text();
				mangaLink[i] = $data.find('li').eq(i).find('h3.title').find('a').attr('href');
			}

			if(latestManga == mangaDate[0]){
				//no update
				console.log("sem mudancas");

			}else if (latestManga == undefined){

				chrome.storage.sync.get("latestManga", function(data){

						if (Object.keys(data).length === 0)
						{
							
							console.log(mangaLink[0]);

							$.ajax({
							     async: false,
							     type: 'GET',
							     url: mangaLink[0],
							     success: function(datat) {
							     	console.log('async');
								    //first run browser;
									var html = datat;
									$data = $(html).find('#series_info');
									img = $data.find('div.cover').find('img').attr('src');
									var firstRun = {
										type: "image",
										title: mangaDate[0] ,
										message: "is the latest manga released",
										contextMessage: "MangaFox Notifier",
										iconUrl: "mf.png",
										imageUrl: img
									};
									// console.log(img);
									console.log("First run latest manga released: "  + manga[0]);

									chrome.notifications.create(firstRun);
					
									latestManga = mangaDate[0];
									latestImg = img;

									chrome.storage.sync.set({"latestManga" : [mangaDate[0], img]}, function(){
										console.log("salvou");
									});
							     }
							});

							
						} else {
							previousManga[0] = data.latestManga[0];
							previousManga[1] = data.latestManga[1];
							console.log(data.latestManga+"adfa");
							console.log(mangaDate[0]+"ada");

							if (previousManga[0] != mangaDate[0])
							{
								console.log("previous manga saved " + previousManga[0] + " " + previousManga[1]);
								var index = mangaDate.indexOf(previousManga[0]);
								// console.log(index);
								// console.log(mangaDate);
								//there is a lot of mangas to alert
								if(index > 0 && index < 10)
								{
									var mangasToUpdate = [];
									for (j=0; j< mangaDate.length; j++){
										if (previousManga[0] == mangaDate[j]){
											break;
										} else {
											mangasToUpdate[j] = mangaDate[j];
											//
										}
									}
									var image;
									for (i = mangasToUpdate.length-1; i >= 0; i--)
									{
										console.log("fora do get: " + i);
										$.ajax({
										     async: false,
										     type: 'GET',
										     url: mangaLink[i],
										     success: function(datat) {
										     	console.log("dentro do get: " + i);
										     	var html = datat;
												$data = $(html).find('#series_info');
												img = $data.find('div.cover').find('img').attr('src');
												//first run browser;
												// if(i == 0)
												// 	image = img;
												var firstRun = {
													type: "image",
													title: mangasToUpdate[i] ,
													message: "was released",
													contextMessage: "MangaFox Notifier",
													iconUrl: "mf.png",
													imageUrl: img
												};
												chrome.notifications.create(firstRun);
												console.log("dentro do get: " + mangaDate[i] + " " + img);

												latestManga = mangaDate[i];
												latestImg = img;

										     }
										});
										
									}
									chrome.storage.sync.set({"latestManga" : [latestManga, latestImg]}, function(){
										console.log("salvou " + latestManga + " " + latestImg);
									});
								} else {
									chrome.storage.sync.get("latestManga", function(dat){

										$.ajax({
										    async: false,
										    type: 'GET',
										    url: mangaLink[0],
										    success: function(datat) {
										     	// if(dat.latestManga[0] != latestManga){
										     		console.log("passou muito tempo: " + latestManga);
													//first run browser;
													var html = datat;
													$data = $(html).find('#series_info');
													img = $data.find('div.cover').find('img').attr('src');
													//first run browser;
													
													var firstRun = {
														type: "image",
														title: mangaDate[0] ,
														message: "was released",
														contextMessage: "MangaFox Notifier",
														iconUrl: "mf.png",
														imageUrl: img
													};
													

													chrome.notifications.create(firstRun);
													latestManga = mangaDate[0];
													latestImg = img;

													chrome.storage.sync.set({"latestManga" : [latestManga, latestImg]}, function(){
														console.log("salvou " + latestManga + " " + latestImg);
													});
												// /}

										    }
										});
									});
								}

							} else {
								//no updates
								console.log("igual nem vim");
								latestManga = previousManga[0];
								latestImg = previousManga[1];			
							}
						}
				});
			} 
			else if (latestManga != mangaDate[0]){


				console.log(latestManga+'eu');
				console.log(mangaDate[0]);
				if(mangaDate.indexOf(latestManga) > -1)
				{
					for (j=0; j< mangaDate.length; j++){
						if (latestManga == mangaDate[j]){
							break;
						} else {
							newManga[j] = mangaDate[j];
							//
						}
					}
					// console.log(latestImg);
					var image;
					for (i = newManga.length-1; i >= 0; i--)
					{
						
						console.log("fora do get: " + i);
						$.ajax({
							async: false,
							type: 'GET',
							url: mangaLink[i],
							success: function(datat) {
						     	console.log("dentro do get: " + i);
						     	var html = datat;
								$data = $(html).find('#series_info');
								img = $data.find('div.cover').find('img').attr('src');
								//first run browser;
								// if(i == 0)
								// 	image = img;
								var firstRun = {
									type: "image",
									title: newManga[i] ,
									message: "was released",
									contextMessage: "MangaFox Notifier",
									iconUrl: "mf.png",
									imageUrl: img
								};
								chrome.notifications.create(firstRun);
								console.log("dentro do get: " + mangaDate[i] + " " + img);

								latestManga = mangaDate[i];
								latestImg = img;
						     }
						});
						
						
					}
					chrome.storage.sync.set({"latestManga" : [latestManga, latestImg]}, function(){
						console.log("salvou " + latestManga + " " + latestImg);
					});
				} else {
					$.ajax({
					    async: false,
					    type: 'GET',
					    url: mangaLink[0],
					    success: function(datat) {
					     	console.log('async');
						    //first run browser;
							var html = datat;
							$data = $(html).find('#series_info');
							img = $data.find('div.cover').find('img').attr('src');
							var firstRun = {
								type: "image",
								title: mangaDate[0] ,
								message: "is the latest manga released",
								contextMessage: "MangaFox Notifier",
								iconUrl: "mf.png",
								imageUrl: img
							};
							// console.log(img);
							console.log("Passou muito tempo, o ultimo manga lançado foi: "  + manga[0]);

							chrome.notifications.create(firstRun);
			
							latestManga = mangaDate[0];
							latestImg = img;

							chrome.storage.sync.set({"latestManga" : [mangaDate[0], img]}, function(){
								console.log("salvou");
							});
					     }
					});
				}

			}


		});
	

}
