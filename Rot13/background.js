function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}


function rot13OnClick(info, tab) {
	var text	= info.selectionText.toLowerCase().trim();
	var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
	var tebahpla = "nopqrstuvwxyzabcdefghijklm0123456789";
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



var cmid1;

chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
	if (chrome.extension.lastError) {
		console.log("Got expected error: " + chrome.extension.lastError.message);
	}
});



chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.request == 'updateContextMenu') {
		var text = msg.selection;
		var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
		var tebahpla = "nopqrstuvwxyzabcdefghijklm0123456789";
		var decoded_string = "";
		var i=0;
		for (i = 0; i < text.length; i++) {
			var coded_letter = text.charAt(i);
			var letter_index = alphabet.indexOf(coded_letter);
			var decoded_letter = tebahpla.charAt(letter_index);
			decoded_string = decoded_string + decoded_letter;
		}
		if(cmid1==null){
			cmid1 = chrome.contextMenus.create({
			"title": "rot13: " + decoded_string ,
			"contexts":["selection"],
			"onclick": rot13OnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "rot13: " + decoded_string ,
			"contexts":["selection"],
			"onclick": rot13OnClick});
		}
	}
});