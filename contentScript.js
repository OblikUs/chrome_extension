//sends URL to server
let url = {url: document.URL}
let xhr = new XMLHttpRequest();
xhr.open('POST', 'https://localhost:8080/', true);
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.send(JSON.stringify(url));



//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "first_click") {
      //html tag
      xhr.addEventListener("load", getData);
      xhr.open('GET', 'https://localhost:8080/api/popup', true);
      xhr.send()

      function getData() {
        let article = JSON.parse(this.responseText);
        console.log('article: ', article.results[0].data[1].row[0].title);
      }

      let html = document.getElementsByTagName('html')[0];

      //div popupContainer
      let popupContainer = document.createElement('div');
      popupContainer.classList.add('popupContainer');
      html.appendChild(popupContainer);

        //div modal child of popupContainer
        let modal = document.createElement('div');
        modal.classList.add('querty');
        modal.style.display = "block";
        popupContainer.appendChild(modal);

          //div modalContent child of modal
          let modalContent = document.createElement('div');
          modalContent.classList.add('modal-contenttt');
          modal.appendChild(modalContent);

            //div modalHeader child of modalContent
            let modalHeader = document.createElement('div');
            modalHeader.classList.add('modal-headerrr');
            modalContent.appendChild(modalHeader);

            //span close child of modalHeader
            let close = document.createElement('span');
            close.classList.add('closeee');
            close.innerHTML = '&times;';
            modalHeader.appendChild(close);

            //Onclick X to remove entire node
            var span = document.getElementsByClassName("closeee")[0];
            span.onclick = function() {
              popupContainer.parentNode.removeChild(popupContainer);
                //Sends to background.js
                chrome.runtime.sendMessage({"message": false});
            }

            //div title child of modalHeader
            let title = document.createElement('div');
            title.classList.add('titleee')
            title.innerHTML = "oblik";
            modalHeader.appendChild(title);

          //div modalBody child of modalContent
          let modalBody = document.createElement('div');
          modalBody.classList.add('modal-bodyyy');
          modalContent.appendChild(modalBody);

            //div article source1
            let articleSource1 = document.createElement('div');
            articleSource1.classList.add('articleSource1');
            articleSource1.innerHTML = "FOX NEWS";
            modalBody.appendChild(articleSource1);

              //div article1Container child of modalContent
              let article1Container = document.createElement('div');
              article1Container.classList.add('article1Container');
              articleSource1.appendChild(article1Container);

            //div article source 2
            let articleSource2 = document.createElement('div');
            articleSource2.classList.add('articleSource2');
            articleSource2.innerHTML = "REUTERS";
            modalBody.appendChild(articleSource2);

              //div article2Container child of modalContent
              let article2Container = document.createElement('div');
              article2Container.classList.add('article2Container');
              articleSource2.appendChild(article2Container);

            //div article source 3
            let articleSource3 = document.createElement('div');
            articleSource3.classList.add('articleSource3');
            articleSource3.innerHTML = "HUFFINGTING POST";
            modalBody.appendChild(articleSource3);

              //div article3Container child of modalContent
              let article3Container = document.createElement('div');
              article3Container.classList.add('article3Container');
              articleSource3.appendChild(article3Container);


            //onclick redirects to link
            article1Container.onclick = function() {
              chrome.runtime.sendMessage({redirect: "http://google.com"});
            }

          // //div modalFooter child of modalContent
          // let modalFooter = document.createElement('div');
          // modalFooter.classList.add('modal-footerrr');
          // modalContent.appendChild(modalFooter);

      // click anywhere on the window to exit
      window.onclick = function(event) {
        if ( event.target.className !== 'modal-contenttt' &&
             event.target.className !== 'titleee' &&
             event.target.className !== 'modal-footerrr' &&
             event.target.className !== 'article1Container'
          ){
          popupContainer.parentNode.removeChild(popupContainer);
          chrome.runtime.sendMessage({"message": false});
        }
      }
    }
    else {
      let popupContainer = document.getElementsByClassName('popupContainer')[0];
      popupContainer.parentNode.removeChild(popupContainer);
    }
  }
);






