function copyTextToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";
	document.body.appendChild(textArea);
	textArea.value = str;
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}


function base64OnClick(info, tab) {
	var text	= info.selectionText.toLowerCase().trim();
	var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=";
	var tebahpla = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=";
	var decoded_string = "";
	var i=0;
	for (i = 0; i < text.length; i++) {
		var coded_letter = text.charAt(i);
		var letter_index = alphabet.indexOf(coded_letter);
		var decoded_letter = tebahpla.charAt(letter_index);
		decoded_string = decoded_string + decoded_letter;
	}
	copyTextToClipboard(decodeBase64(decoded_string));
}


var cmid1;


chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
	if (chrome.extension.lastError) {
		console.log("Got expected error: " + chrome.extension.lastError.message);
	}
});

function decodeBase64 (s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.request == 'updateContextMenu') {
		var text = msg.selection;
		var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=";
		var tebahpla = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=";
		var decoded_string = "";
		var i=0;
		for (i = 0; i < text.length; i++) {
			var coded_letter = text.charAt(i);
			var letter_index = alphabet.indexOf(coded_letter);
			var decoded_letter = tebahpla.charAt(letter_index);
			decoded_string = decoded_string + decoded_letter;
		}
		decoded_string = decodeBase64(decoded_string);
		if(cmid1==null){
			cmid1 = chrome.contextMenus.create({
			"title": "base64: " + decoded_string ,
			"contexts":["selection"],
			"onclick": base64OnClick});
		}else{
			chrome.contextMenus.remove(cmid1);
			cmid1 = chrome.contextMenus.create({
			"title": "base64: " + decoded_string ,
			"contexts":["selection"],
			"onclick": base64OnClick});
		}
	}
});