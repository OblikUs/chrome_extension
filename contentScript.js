

//send URL to server
let url = {url: document.URL}
let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8080/', true);
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.send(JSON.stringify(url));

//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message = "clicked_browser_action") {

      let modal = document.createElement('div');
      modal.classList.add('modal');
      document.body.appendChild(modal);
      modal.style.display = "block";

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modal.appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalContent.appendChild(modalHeader);

          let close = document.createElement('span');
          close.classList.add('close');
          close.innerHTML = '&times;';
          modalHeader.appendChild(close);

          let h2 = document.createElement('h2');
          h2.innerHTML = "Modal Header";
          modalHeader.appendChild(h2);

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalContent.appendChild(modalBody);

          let p = document.createElement('p');
          p.innerHTML = 'hello hello hello paragraph';
          modalBody.appendChild(p);

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalContent.appendChild(modalFooter);
    }
  }
);



// let iframe = document.createElement('iframe');
// iframe.src = chrome.extension.getURL('newsPop.html');
// iframe.id = 'myCustomPopUp1234';
// iframe.style.height = "150px";
// document.body.appendChild(iframe);




