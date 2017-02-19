let x = false;
function updateState(){
    if (x === false){
        x=true;
        enableBrowserAction();
    }else{
        x=false;
        disableBrowserAction();
    }
}

function disableBrowserAction(){
  console.log('disabled');
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      //Sends message to contentScript.js
      chrome.tabs.sendMessage(activeTab.id, {"message": "already_clicked"});
    });
}

function enableBrowserAction(){
  console.log('enabled');
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      //Sends message to contentScript.js
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
}


chrome.browserAction.onClicked.addListener(updateState);



chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});