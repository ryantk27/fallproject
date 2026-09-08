// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "scrape_page") {

        const pageData = {
            url: window.location.href,
            dom: document.documentElement.outerHTML,
            text: document.body.innerText
        };

        sendResponse(pageData);
    }

});