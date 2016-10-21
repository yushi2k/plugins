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
	var alphabet = "0123456789abcdef";
	var tebahpla = "fedcba9876543210";
	var decoded_string = "";
	var i=0;
	for (i = 0; i < text.length; i++) {
		var coded_letter = text.charAt(i);
		var letter_index = alphabet.indexOf(coded_letter);
		var decoded_letter = tebahpla.charAt(letter_index);
		decoded_string = decoded_string + decoded_letter;
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
		var alphabet = "0123456789abcdef";
		var tebahpla = "fedcba9876543210";
		var decoded_string = "";
		var i=0;
		var decoded_string_at = "";

		for (i = 0; i < text.length; i++) {
			var coded_letter = text.charAt(i);
			var letter_index = alphabet.indexOf(coded_letter);
			var decoded_letter = tebahpla.charAt(letter_index);
			decoded_string_at = decoded_string_at + decoded_letter;
		}

		if(cmid3==null){
			cmid3 = chrome.contextMenus.create({
			"title": "Atbash(0-f): " + decoded_string_at ,
			"contexts":["selection"],
			"onclick": atbashOnClick});
		}else{
			chrome.contextMenus.remove(cmid3);
			cmid3 = chrome.contextMenus.create({
			"title": "Atbash(0-f): " + decoded_string_at ,
			"contexts":["selection"],
			"onclick": atbashOnClick});
		}
	}
});