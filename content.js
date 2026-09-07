// content.js

// Listen for a request to scrape the page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrape_page") {
    
    const pageData = {
      // 1. Grab the URL of the current page
      url: window.location.href,
      
      // 2. Grab the full raw DOM HTML string
      dom: document.documentElement.outerHTML,
      
      // 3. Grab just the visible text inside the <body>
      text: document.body.innerText
    };

    // Send the data bundle back to whoever asked for it
    sendResponse(pageData);
  }
  return true; // Keeps the communication channel open
});
