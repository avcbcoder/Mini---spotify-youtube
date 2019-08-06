/*global chrome*/

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
   // Send a message to the active tab
   chrome.tabs.query({}, function (tabs) {
      for (let i = 0; i < tabs.length; i++) {
         var activeTab = tabs[i];
         chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
      }
   });
});

// recieve msg from foreground and send to one or all tabs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.type === "notification") {
      chrome.tabs.query({}, function (tabs) {
         for (let i = 0; i < tabs.length; i++) {
            var activeTab = tabs[i];
            chrome.tabs.sendMessage(activeTab.id, { "message": "console" });
         }
      });
   }
   sendResponse()
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.type === "extract-spotify-data") {
      chrome.tabs.query({}, function (tabs) {
         for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            if (tab.url.includes('//open.spotify.com')) {
               chrome.tabs.executeScript(tab.id, { file: "app/open-spotify.js" })
            }
         }
      });
   }
});

const executeMediaButton = (id, media) => {
   chrome.tabs.executeScript(id, { code: `${media}.click()` });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.type === "media") {
      chrome.tabs.query({}, function (tabs) {
         for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            if (tab.url.includes('//open.spotify.com')) {
               chrome.tabs.executeScript(tab.id, { file: "app/page-elements.js" },
                  executeMediaButton(tab.id, request.options.type))
            }
         }
      });
   }
});

