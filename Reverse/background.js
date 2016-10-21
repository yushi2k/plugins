function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}

function reverseOnClick(info, tab) {

	var text	= info.selectionText.toLowerCase().trim();
	var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
	var tebahpla = "abcdefghijklmnopqrstuvwxyz0123456789";
	var decoded_string = "";
	var i=0;
	for (i = 0; i < text.length; i++) {
		var coded_letter = text.charAt(i);
		var letter_index = alphabet.indexOf(coded_letter);
		var decoded_letter = tebahpla.charAt(letter_index);
		decoded_string = decoded_string + decoded_letter;
	}
	var array   = decoded_string.split("");
	var rev	 = array.reverse();
	var dest	= rev.join("");
	copyTextToClipboard(dest);
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
		var tebahpla = "abcdefghijklmnopqrstuvwxyz0123456789";
		var decoded_string = "";
		var i=0;
		for (i = 0; i < text.length; i++) {
			var coded_letter = text.charAt(i);
			var letter_index = alphabet.indexOf(coded_letter);
			var decoded_letter = tebahpla.charAt(letter_index);
			decoded_string = decoded_string + decoded_letter;
		}
		var array   = decoded_string.split("");
		var rev	 = array.reverse();
		var decoded_string_rev	= rev.join("");

		if(cmid1==null){
			cmid1 = chrome.contextMenus.create({
			"title": "Reverse: " + decoded_string_rev ,
			"contexts":["selection"],
			"onclick": reverseOnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "Reverse: " + decoded_string_rev ,
			"contexts":["selection"],
			"onclick": reverseOnClick});
		}

	}
});