

//send URL to server
let url = {url: document.URL}
let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8080/', true);
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.send(JSON.stringify(url));

//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('request: ', request.message);
    if (request.message === "clicked_browser_action") {
      console.log('hit');
      let html = document.getElementsByTagName('html')[0];

      let popupContainer = document.createElement('div');
      popupContainer.classList.add('popupContainer');
      html.appendChild(popupContainer);

      let modal = document.createElement('div');
      modal.classList.add('querty');
      popupContainer.appendChild(modal);
      modal.style.display = "block";


        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-contenttt');
        modal.appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-headerrr');
        modalContent.appendChild(modalHeader);

          let close = document.createElement('span');
          close.classList.add('closeee');
          close.innerHTML = '&times;';
          modalHeader.appendChild(close);

          //click X to exit
          var span = document.getElementsByClassName("closeee")[0];
          span.onclick = function() {
            popupContainer.parentNode.removeChild(popupContainer);
          }

          let h2 = document.createElement('div');
          h2.classList.add('myh2')
          h2.innerHTML = "biazed";
          modalHeader.appendChild(h2);


        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-bodyyy');
        modalContent.appendChild(modalBody);

          let article1Container = document.createElement('div');
          article1Container.classList.add('article1Container');
          modalContent.appendChild(article1Container);
          article1Container.onclick = function() {
            chrome.runtime.sendMessage({redirect: "http://google.com"});
          }

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footerrr');
        modalContent.appendChild(modalFooter);

      // click anywhere on the window to exit
      window.onclick = function(event) {
        console.log('event: ', event);
        console.log('event.target: ', event.target.className);
        if ( event.target.className !== 'modal-contenttt' &&
             event.target.className !== 'myh2' &&
             event.target.className !== 'modal-footerrr' &&
             event.target.className !== 'article1Container'
          ){
          popupContainer.parentNode.removeChild(popupContainer);
        }
      }
    }
    else {
      let popupContainer = document.getElementsByClassName('popupContainer')[0];
      popupContainer.parentNode.removeChild(popupContainer);
    }
  }
);



// let iframe = document.createElement('iframe');
// iframe.src = chrome.extension.getURL('newsPop.html');
// iframe.id = 'myCustomPopUp1234';
// iframe.style.height = "150px";
// document.body.appendChild(iframe);




