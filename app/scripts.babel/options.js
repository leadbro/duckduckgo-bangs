function save_options() {

    let newTab = document.getElementById('newTab').checked;
    let buttonText = document.getElementById('buttonText').value;

    let googleButton = document.getElementById('googleButton').checked;
    let googleImagesButton = document.getElementById('googleImagesButton').checked;

    let yandexButton = document.getElementById('yandexButton').checked;
    let yandexImagesButton = document.getElementById('yandexImagesButton').checked;

    chrome.storage.local.set({
        newTab: newTab,
        buttonText: buttonText,

        googleButton: googleButton,
        googleImagesButton: googleImagesButton,

        yandexButton: yandexButton,
        yandexImagesButton: yandexImagesButton,
    }, function() {
        // Update status to let user know options were saved.

        let status = document.getElementsByClassName('status');
        for (let i = 0; i < status.length; i++) {
            status[i].style.display = 'block';
            status[i].textContent = 'Options saved.';
        }
        setTimeout(function() {
            for (let i = 0; i < status.length; i++) {
                status[i].textContent = '';
                status[i].style.display = 'none';
            }
        }, 1000);
    });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
        newTab: false,
        buttonText: 'shortName',

        googleButton: true,
        googleImagesButton: true,
    }, function(items) {
        document.getElementById('newTab').checked = items.newTab;
        document.getElementById('buttonText').value = items.buttonText;

        document.getElementById('googleButton').checked = items.googleButton;
        document.getElementById('googleImagesButton').checked = items.googleImagesButton;

        document.getElementById('yandexButton').checked = items.yandexButton;
        document.getElementById('yandexImagesButton').checked = items.yandexImagesButton;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementsByClassName('save').addEventListener('click',
//     save_options);

let save = document.getElementsByClassName('save');
for (let i = 0; i < save.length; i++) {
    save[i].addEventListener('click', save_options);
}
