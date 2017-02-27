$("body").append('Testicles');


//sends URL to server
let url = {url: document.URL}
let getArticles = new XMLHttpRequest();
getArticles.open('POST', 'https://localhost:8080/', true);
getArticles.addEventListener("load", getData);
getArticles.setRequestHeader("content-type", "application/json; charset=UTF-8");
getArticles.send(JSON.stringify(url));
let articles;
function getData() {
  let article = JSON.parse(this.responseText);
  articles = article;
}

let newUrl = url.url;
let part = newUrl.split("/");
if (part[2] === "www.cnn.com") {
  let videoPlayer = document.getElementsByClassName('js-media__video media__video');
  console.log('videoPlayer: ', videoPlayer);
  videoPlayer[0].style.zIndex = 0;
  let rightPopup = document.getElementsByClassName('sibling sibling--next');
  // rightPopup[0].style.zIndex = 0;

  let leftPopup= document.getElementsByClassName('sibling sibling--previous');
  // leftPopup[0].style.zIndex = 0;
};

if (part[2] === "www.reuters.com") {
  let ad = document.getElementsByClassName('section article-sticky')[0];
  ad.style.zIndex = 0;
};

if (part[2] === "bigstory.ap.org") {
  let video = document.querySelector('.ndn_floatContainer, .ndn_floatContainer_disabled');
  console.log('video: ', video);
  // video[0].style.zIndex = 0;
};

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

function linkRedirect(element){
  element.onclick = function() {
    chrome.runtime.sendMessage({redirect: articles[i][0].url});
    chrome.runtime.sendMessage({"message": false});
  }
}

//listens from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "first_click") {

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

          //Data
          for (let i = 0; i < articles.length; i++){
            console.log('articles[i][0]: ', articles[i][0]);

            //liberal
            if (articles[i][0].view === "center-left") {

            //div article source1
            let liberal = document.createElement('div');
            liberal.classList.add('liberal');
            liberal.innerHTML = articles[i][0].view;
            modalBody.appendChild(liberal);

              //div liberalContainer child of modalContent
              let liberalContainer = document.createElement('div');
              liberalContainer.classList.add('liberalContainer');
              liberalContainer.onclick = function() {
                chrome.runtime.sendMessage({redirect: articles[i][0].url});
                chrome.runtime.sendMessage({"message": false});
              }
              liberal.appendChild(liberalContainer);

              //title
              let titleLiberal = document.createElement('div');
              titleLiberal.classList.add('titleLiberal');
              titleLiberal.innerHTML = articles[i][0].title;
              liberalContainer.appendChild(titleLiberal);

            //center
            } else if (articles[i][0].view === "center") {

            //div article source 2
            let center = document.createElement('div');
            center.classList.add('center');
            center.innerHTML = articles[i][0].view;
            modalBody.appendChild(center);

              //div centerContainer child of modalContent
              let centerContainer = document.createElement('div');
              centerContainer.classList.add('centerContainer');
              centerContainer.onclick = function() {
                chrome.runtime.sendMessage({redirect: articles[i][0].url});
                chrome.runtime.sendMessage({"message": false});
              }
              center.appendChild(centerContainer);

              //title
              let titleCenter = document.createElement('div');
              titleCenter.classList.add('titleCenter');
              titleCenter.innerHTML = articles[i][0].title;
              centerContainer.appendChild(titleCenter);

            //conservative
            } else if (articles[i][0].view === "center-right"){

            //div article source 3
            let conservative = document.createElement('div');
            conservative.classList.add('conservative');
            conservative.innerHTML = articles[i][0].view;
            modalBody.appendChild(conservative);

              //div conservativeContainer child of modalContent
              let conservativeContainer = document.createElement('div');
              conservativeContainer.classList.add('conservativeContainer');
              conservativeContainer.onclick = function() {
                chrome.runtime.sendMessage({redirect: articles[i][0].url});
                chrome.runtime.sendMessage({"message": false});
              }
              conservative.appendChild(conservativeContainer);

              //title
              let titleConservative = document.createElement('div');
              titleConservative.classList.add('titleConservative');
              titleConservative.innerHTML = articles[i][0].title;
              conservativeContainer.appendChild(titleConservative);
            }
          }

      // click anywhere on the window to exit
      window.onclick = function(event) {
        console.log('event.target.className: ', event.target.className);
        if ( event.target.className !== 'oblik-content' &&
             event.target.className !== 'oblik-header' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'liberalContainer' &&
             event.target.className !== 'conservativeContainer' &&
             event.target.className !== 'centerContainer' &&
             event.target.className !== 'liberal' &&
             event.target.className !== 'center' &&
             event.target.className !== 'conservative'
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







