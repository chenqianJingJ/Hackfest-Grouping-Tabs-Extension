import openai;

// Call the function to get all current tabs
let tabsUrl = getAllTabsUrl();
/*
Define a function to get all current tabs in current window
*/
function getAllTabsUrl() {
  // Use chrome.tabs.query() to get all tabs
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    let tabsUrl = tabs.map(tab => tab.url);
    console.log(tabsUrl);
  });
};
