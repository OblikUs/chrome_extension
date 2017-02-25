//sends URL to server
let url = {url: document.URL}
let sendXHR = new XMLHttpRequest();
sendXHR.open('POST', 'https://localhost:8080/', true);
sendXHR.addEventListener("load", getData);
sendXHR.setRequestHeader("content-type", "application/json; charset=UTF-8");
sendXHR.send(JSON.stringify(url));

function closeAnimation() {

  let popupContainer = document.getElementsByClassName('popupContainer')[0];

  let fadeOut = document.getElementsByClassName('oblik-modal')[0];
  fadeOut.id ='fadeOut';

  let slideOut = document.getElementsByClassName('oblik-content')[0];
  slideOut.id ='slideOut';

  setTimeout(function(){
    popupContainer.parentNode.removeChild(popupContainer);
    chrome.runtime.sendMessage({"message": false});
  }, 400);
}


//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "first_click") {

      function getData() {
        let article = JSON.parse(this.responseText);
        console.log('article');
      }

      let html = document.getElementsByTagName('html')[0];

      //div popupContainer
      let popupContainer = document.createElement('div');
      popupContainer.classList.add('popupContainer');
      html.appendChild(popupContainer);

        //div modal child of popupContainer
        let modal = document.createElement('div');
        modal.classList.add('oblik-modal');
        // modal.style.display = "block";
        popupContainer.appendChild(modal);

          //div modalContent child of modal
          let modalContent = document.createElement('div');
          modalContent.classList.add('oblik-content');
          modal.appendChild(modalContent);

            //div modalHeader child of modalContent
            let modalHeader = document.createElement('div');
            modalHeader.classList.add('oblik-header');
            modalContent.appendChild(modalHeader);

            //span close child of modalHeader
            let close = document.createElement('span');
            close.classList.add('oblik-close');
            close.innerHTML = '&times;';
            modalHeader.appendChild(close);

            //Onclick X to remove entire node
            var span = document.getElementsByClassName("oblik-close")[0];
            span.onclick = function() {
              closeAnimation();
            }

            //div title child of modalHeader
            let title = document.createElement('div');
            title.classList.add('oblik-title')
            title.innerHTML = "oblik";
            modalHeader.appendChild(title);

          //div modalBody child of modalContent
          let modalBody = document.createElement('div');
          modalBody.classList.add('oblik-body');
          modalContent.appendChild(modalBody);

            //div article source1
            let articleSource1 = document.createElement('div');
            articleSource1.classList.add('articleSource1');
            articleSource1.innerHTML = "FOX NEWS";
            modalBody.appendChild(articleSource1);

              //div article1Container child of modalContent
              let article1Container = document.createElement('div');
              article1Container.classList.add('articleContainer1');
              articleSource1.appendChild(article1Container);

            //div article source 2
            let articleSource2 = document.createElement('div');
            articleSource2.classList.add('articleSource2');
            articleSource2.innerHTML = "REUTERS";
            modalBody.appendChild(articleSource2);

              //div article2Container child of modalContent
              let article2Container = document.createElement('div');
              article2Container.classList.add('articleContainer2');
              articleSource2.appendChild(article2Container);

            //div article source 3
            let articleSource3 = document.createElement('div');
            articleSource3.classList.add('articleSource3');
            articleSource3.innerHTML = "HUFFINGTING POST";
            modalBody.appendChild(articleSource3);

              //div article3Container child of modalContent
              let article3Container = document.createElement('div');
              article3Container.classList.add('articleContainer3');
              articleSource3.appendChild(article3Container);


            //onclick redirects to link
            article1Container.onclick = function() {
              chrome.runtime.sendMessage({redirect: "http://google.com"});
            }


      // click anywhere on the window to exit
      window.onclick = function(event) {
        console.log('event.target.className: ', event.target.className);
        if ( event.target.className !== 'oblik-content' &&
             event.target.className !== 'oblik-header' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'article1Container' &&
             event.target.className !== 'articleSource1' &&
             event.target.className !== 'articleSource2' &&
             event.target.className !== 'articleSource3'
          ){
          closeAnimation();
        }
      }
    }
    else {
      closeAnimation();
    }
  }
);







