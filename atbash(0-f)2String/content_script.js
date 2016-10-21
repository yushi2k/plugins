document.addEventListener('selectionchange', function() {
    var selection = window.getSelection().toString().toLowerCase().trim();
    chrome.runtime.sendMessage({
        request: 'updateContextMenu',
        selection: selection
    });
});