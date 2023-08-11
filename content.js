// content.js

// listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // if we have a message
    if (message.action === 'changeColor') {
        const div = document.querySelector("._previewContentWrapper_9oi8y_23");
        // and the div exists
        if (div) {
            div.style.backgroundColor = message.color;
        }
    }
});

// get color from local storage and apply it
function colorIt() {
    chrome.storage.local.get(['DBStylesSelectColor'], function (result) {
        console.log(result.DBStylesSelectColor);
        let selectedColor = result.DBStylesSelectColor;
        // Do something with color
        if (selectedColor) {
            const div = document.querySelector("._previewContentWrapper_9oi8y_23");
            if (div) {
                div.style.backgroundColor = selectedColor;
            }
        }
    });
}

//check color every 500ms
setInterval(() => {
    colorIt();
}, 500);
