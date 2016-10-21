function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}


function morseOnClick(info, tab) {
	var text	= info.selectionText.toLowerCase().trim();
	var alphabet = "10.- ";
	var tebahpla = "-.-. ";
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
	decoded_string = morsecode(dest);
	copyTextToClipboard(decoded_string);
}



var cmid1;

chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {	if (chrome.extension.lastError) {	console.log("Got expected error: " + chrome.extension.lastError.message);}});


function morsecode(input){
	var alphabet = {
		".-"		: "a",
		"-..."		: "b",
		"-.-."		: "c",
		"-.."		: "d",
		"."			: "e",
		"..-."		: "f",
		"--."		: "g",
		"...."		: "h",
		".."		: "i",
		".---"		: "j",
		"-.-"		: "k",
		".-.."		: "l",
		"--"		: "m",
		"-."		: "n",
		"---"		: "o",
		".--."		: "p",
		"--.-"		: "q",
		".-."		: "r",
		"..."		: "s",
		"-"			: "t",
		"..-"		: "u",
		"...-"		: "v",
		".--"		: "w",
		"-..-"		: "x",
		"-.--"		: "y",
		"--.."		: "z",
		"-----"		: "0",
		".----"		: "1",
		"..---"		: "2",
		"...--"		: "3",
		"....-"		: "4",
		"....."		: "5",
		"-...."		: "6",
		"--..."		: "7",
		"---.."		: "8",
		"----."		: "9",
		'.-.-.-'	: '.',
		'--..--'	: ',',
		'..--..'	: '?',
		'-....-'	: '-',
		'-...-'		: '=',
		'---...'	: ':',
		'-.-.-.'	: ';',
		'-.--.'		: '(',
		'-.--.-'	: ')',
		'-..-.'		: '/',
		'.-..-.'	: '"',
		'...-..-'	: '$',
		'.----.'	: "'",
		 '.-.-..'	: '¶',
		'..--.-'	: '_',
		'.--.-.'	: '@',
		'---.'		: '!',
		'-.-.--'	: '!',
		'.-.-.'		: '+',
		'.-...'		: '~',
		'...-.-'	: '#',
		'. ...'		: '&',
		'-..-.'		: '⁄',

	};
	return input.split(' ').map(function(e){ return alphabet[e.toLowerCase()] || '';}).join(''); 
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.request == 'updateContextMenu') {
		var text = msg.selection;
		var alphabet = "10.- ";
		var tebahpla = "-.-. ";
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
		decoded_string = morsecode(dest);
		if(cmid1==null){
			cmid1 = chrome.contextMenus.create({
			"title": "morse(XR): " + decoded_string ,
			"contexts":["selection"],
			"onclick": morseOnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "morse(XR): " + decoded_string ,
			"contexts":["selection"],
			"onclick": morseOnClick});
		}
	}
});