

//send URL to server
let url = {url: document.URL}
let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8080/', true);
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.send(JSON.stringify(url));

//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message = "console.log('request: ', request)") {
      let div = document.createElement('iframe');
      iframe.src = chrome.extension.getURL('newsPop.html');
      iframe.id = 'myCustomPopUp1234';
      iframe.style.height = "150px";
      document.body.appendChild(iframe);
    }
  }
);







