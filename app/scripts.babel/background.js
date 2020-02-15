// Load the options page on install.
chrome.runtime.onInstalled.addListener(function() {
    chrome.runtime.openOptionsPage();
});

// Function to add children to a parent Context Menu.
function refreshContextMenu() {
    chrome.contextMenus.removeAll();
    createMainMenu();
    addChildrenToContextMenu();
}

function addChildToContextMenu(title, bang, parentMenu = 'parentMenu') {
    chrome.contextMenus.create({
        id: title.replace(' ', '').toLowerCase(),
        title: title,
        contexts: ['selection'],
        'parentId': parentMenu,
        onclick: function(info, tab) {
            const queryText = info.selectionText;
            chrome.tabs.create({
                'url': 'https://duckduckgo.com/?q=' + queryText + ' ' + bang,
                'index': tab.index + 1,
                'active': true
            });
        }
    });
}


//This adds Context Menu when user select some text.
function createMainMenu() {
    chrome.contextMenus.create({
        id: 'parentMenu',
        title: 'Search "%s" on:',
        contexts: ['selection']
    });
}
createMainMenu();


// Add children when set in options.
function addChildrenToContextMenu() {
    chrome.storage.local.get(null, function(items) {

        if (items.duckDuckGoLink === true) {
            addChildToContextMenu('DuckDuckGo', '');
        }
        if (items.googleLink === true) {
            addChildToContextMenu('Google', '!g');
        }
        if (items.googleImagesLink === true) {
            addChildToContextMenu('Google Images', '!gi');
        }
        if (items.yandexLink === true) {
            addChildToContextMenu('Yandex', '!ya');
        }
        if (items.yandexImagesLink === true) {
            addChildToContextMenu('Yandex Images', '!ymg');
        }
    });
}
addChildrenToContextMenu();

chrome.storage.onChanged.addListener(function (){
    refreshContextMenu();
});

chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.tabs.query({
        'currentWindow': true,
        'active': true
    }, function(tabs) {
        chrome.tabs.update(tabs[0].id, {
            url: 'https://duckduckgo.com/?q=' + encodeURIComponent(text)
        });
    });
});
