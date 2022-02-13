let isExecuted = false;

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  if (!isExecuted) {
    chrome.tabs.executeScript(null, { file: "index.js" });
  }

  isExecuted = true;
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (!message) {
    sendResponse({
      'status': false
    });
  }
  else (message.contentScriptQuery === 'post')
  {
    fetch(message.endpoint, {
      'method': 'GET'
    })
    .then((response) => {
      if (response && response.ok) {
        sendResponse(response);
      }
    })
    .catch((error) => {
      sendResponse({
        'status': false
      });
    });
  }

  return true;
});
