function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}


function atbashOnClick(info, tab) {
	var text	= info.selectionText.toLowerCase().trim();
	var decoded_string = "";
	var i=0;
		if((text.length % 2 )<1){
			for (i = 0; i < text.length;) {
				var coded_letter = String.fromCharCode(parseInt(text.slice(i,i+2)));
				decoded_string = decoded_string + coded_letter;
				i+=2;
			}
		}
	copyTextToClipboard(decoded_string);
}


var cmid3;


chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
	if (chrome.extension.lastError) {
		console.log("Got expected error: " + chrome.extension.lastError.message);
	}
});



chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.request == 'updateContextMenu') {
		var text = msg.selection;
		var decoded_string = "";
		var i=0;
		var decoded_string_at = "";
		if((text.length % 2 )<1){
			for (i = 0; i < text.length;) {
				var coded_letter = String.fromCharCode(parseInt(text.slice(i,i+2)));
				decoded_string_at = decoded_string_at + coded_letter;
				i+=2;
			}
		}
		if(cmid3==null){
			cmid3 = chrome.contextMenus.create({
			"title": "Asc2String: " + decoded_string_at ,
			"contexts":["selection"],
			"onclick": atbashOnClick});
		}else{
			chrome.contextMenus.remove(cmid3);
			cmid3 = chrome.contextMenus.create({
			"title": "Asc2String: " + decoded_string_at ,
			"contexts":["selection"],
			"onclick": atbashOnClick});
		}
	}
});