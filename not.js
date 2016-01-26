var options = {
	type: "basic",
	title: "df",
	message: "oi",
	iconUrl: "df.png"
};

chrome.notifications.create(options, callback);

function callback()
{
	console.log("done");
}
