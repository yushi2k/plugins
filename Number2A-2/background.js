function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}


function n2aOnClick(info, tab) {
	var text	= info.selectionText.toLowerCase().trim();
	var alphabet = "0123456789abcdefghijklmnopqrstuvwxyz.,:/- ";
	var tebahpla = "0123456789abcdefghijklmnopqrstuvwxyz      ";
	var decoded_string = "";
	var i=0;
	for (i = 0; i < text.length; i++) {
		var coded_letter = text.charAt(i);
		var letter_index = alphabet.indexOf(coded_letter);
		var decoded_letter = tebahpla.charAt(letter_index);
		decoded_string = decoded_string + decoded_letter;
	}
	decoded_string = decoded_string=number2alphabet(decoded_string);
	copyTextToClipboard(decoded_string);
}


function number2alphabet(input){
	var alphabet = {
		 "1"	: "a",
		 "2"	: "b",
		 "3"	: "c",
		 "4"	: "d",
		 "5"	: "e",
		 "6"	: "f",
		 "7"	: "g",
		 "8"	: "h",
		 "9"	: "i",
		"01"	: "a",
		"02"	: "b",
		"03"	: "c",
		"04"	: "d",
		"05"	: "e",
		"06"	: "f",
		"07"	: "g",
		"08"	: "h",
		"09"	: "i",
		"10"	: "j",
		"11"	: "k",
		"12"	: "l",
		"13"	: "m",
		"14"	: "n",
		"15"	: "o",
		"16"	: "p",
		"17"	: "q",
		"18"	: "r",
		"19"	: "s",
		"20"	: "t",
		"21"	: "u",
		"22"	: "v",
		"23"	: "w",
		"24"	: "x",
		"25"	: "y",
		"26"	: "z"
	};           
	return input.split(' ').map(function(e){ return alphabet[e] || '';}).join('');
}



var cmid1;

chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {	if (chrome.extension.lastError) {	console.log("Got expected error: " + chrome.extension.lastError.message);}});


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.request == 'updateContextMenu') {
		var text = msg.selection;
		var alphabet = "0123456789abcdefghijklmnopqrstuvwxyz.,:/- ";
		var tebahpla = "0123456789abcdefghijklmnopqrstuvwxyz      ";
		var decoded_string = "";
		var i=0;
		for (i = 0; i < text.length; i++) {
			var coded_letter = text.charAt(i);
			var letter_index = alphabet.indexOf(coded_letter);
			var decoded_letter = tebahpla.charAt(letter_index);
			decoded_string = decoded_string + decoded_letter;
		}
		decoded_string=number2alphabet(decoded_string);

		if(cmid1==null){
			cmid1 = chrome.contextMenus.create({
			"title": "N2A(a1-z26): " + decoded_string ,
			"contexts":["selection"],
			"onclick": n2aOnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "N2A(a1-z26): " + decoded_string ,
			"contexts":["selection"],
			"onclick": n2aOnClick});
		}
	}
});