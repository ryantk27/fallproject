//ELEMENTS
document.getElementById('startButton').addEventListener('click', async () => {
  // Find the first active tab in the current window
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(
        tab.id,
        { action: "scrape_page" },
        (pageData) => {

            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            console.log("Scraped Data:", pageData);
        }
    );

});