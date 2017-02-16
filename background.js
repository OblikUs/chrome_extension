chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
  alert(response);
})

// chrome.browserAction.onClicked.addListener(function (tab) {
//   // for the current tab, inject the "inject.js" file & execute it
//   console.log('hit');
//   chrome.tabs.executeScript(tab.ib, {
//     file: 'contentScript.js'
//   });
// });

console.log('hazza');