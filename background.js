groupTabs();

async function groupTabs() {
  try {
    const tabsCollection = await getAllTabsUrl();
    const tabsUrl = Object.keys(tabsCollection);
    console.log(tabsCollection);
    const apiKey = '';
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": `Please classify and group related urls ${tabsUrl}. Please response a stringified json format: name of the classification, array of following related urls. Example: {"AWS Related": ["https...", "https://"]}`,
        "max_tokens": 3800,
      })
    });
    const responseData = await response.json();
    const responseText = JSON.parse(responseData.choices[0].text);
    console.log(responseText);

    for (let key in responseText) {
      console.log(key);
      console.log(typeof key);
      let tabIds = [];
      let urlList = responseText[key];
      console.log(urlList);
      for (let index in urlList) {
        let tabId = tabsCollection[urlList[index]];
        tabIds.push(tabId);
      };
      const groupId = await chrome.tabs.group({ tabIds });
      console.log(groupId);
      await chrome.tabGroups.update(groupId, { title: key });
    }
    window.close();
  } catch (error) {
    console.error(error);
  } 
}

/*
Define a function to get all current tabs in current window
*/
function getAllTabsUrl() {
  // Create a new Promise
  return new Promise((resolve, reject) => {
    // Use chrome.tabs.query() to get all tabs
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      let tabsCollection = {};
      tabs.forEach(function (tab) {
        tabsCollection[tab.url] = tab.id;
      });
      // Resolve the Promise with the result
      resolve(tabsCollection);
    });
  });
};


