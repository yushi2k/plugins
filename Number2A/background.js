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
		 "0"	: "a",
		 "1"	: "b",
		 "2"	: "c",
		 "3"	: "d",
		 "4"	: "e",
		 "5"	: "f",
		 "6"	: "g",
		 "7"	: "h",
		 "8"	: "i",
		 "9"	: "j",
		"00"	: "a",
		"01"	: "b",
		"02"	: "c",
		"03"	: "d",
		"04"	: "e",
		"05"	: "f",
		"06"	: "g",
		"07"	: "h",
		"08"	: "i",
		"09"	: "j",
		"10"	: "k",
		"11"	: "l",
		"12"	: "m",
		"13"	: "n",
		"14"	: "o",
		"15"	: "p",
		"16"	: "q",
		"17"	: "r",
		"18"	: "s",
		"19"	: "t",
		"20"	: "u",
		"21"	: "v",
		"22"	: "w",
		"23"	: "x",
		"24"	: "y",
		"25"	: "z"
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
			"title": "N2A(a0-z25): " + decoded_string ,
			"contexts":["selection"],
			"onclick": n2aOnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "N2A(a0-z25): " + decoded_string ,
			"contexts":["selection"],
			"onclick": n2aOnClick});
		}
	}
});