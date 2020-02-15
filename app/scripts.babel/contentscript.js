const searchElement = document.getElementById('search_form_input');
const linksElement = document.getElementById('links');
const styling = '.bang-btn { margin: 10px; }';

const urlBuilder = (query, bang) => {
    return 'https://duckduckgo.com/?q=' + bang + '%20' + query;
};

// Build the HTML for the button link
const linkBuilder = (query, bang, shortName, fullName) => {
    const url = urlBuilder(query, bang);
    const a = document.createElement('a');
    a.className = 'button bang-btn';
    a.href = url;

    // Set button text from option setting
    chrome.storage.local.get('buttonText', function(items) {
        if (items.buttonText === 'fullName') {
            a.textContent = fullName;
        } else if (items.buttonText === 'bang') {
            a.textContent = bang;
        } else {
            a.textContent = shortName;
        }
    });
    a.title = 'Search for "' + query + '" on ' + fullName;
    // Open link in new tab if set in options.
    chrome.storage.local.get('newTab', function(items) {
        if (items.newTab === true) {
            a.target = '_blank';
        }
    });
    return a;
};


const inject = (query) => {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.textContent = styling;
    document.body.appendChild(css);

    const containerElement = linksElement.parentElement;
    chrome.storage.local.get(null, function(items) {
        if (items.googleButton === true) {
            containerElement.insertBefore(linkBuilder(query, '!g', 'G', 'Google'), linksElement);
        }
        if (items.googleImagesButton === true) {
            containerElement.insertBefore(linkBuilder(query, '!gi', 'Img', 'Google Images'), linksElement);
        }
        if (items.yandexButton === true) {
            containerElement.insertBefore(linkBuilder(query, '!ya', 'Img', 'Yandex'), linksElement);
        }
        if (items.yandexImagesButton === true) {
            containerElement.insertBefore(linkBuilder(query, '!ymg', 'Img', 'Yandex Images'), linksElement);
        }
    });

};

if (searchElement !== null && linksElement !== null) {
    inject(searchElement.value);
}
