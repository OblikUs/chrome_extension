//sends URL to server
let url = {url: document.URL}
let getArticles = new XMLHttpRequest();
getArticles.open('POST', 'https://oblik.us/related-articles/', true);
getArticles.addEventListener("load", getData);
getArticles.setRequestHeader("content-type", "application/json; charset=UTF-8");
getArticles.send(JSON.stringify(url));

//recieve articles from server
let articles;
function getData() {
  let articleRes = JSON.parse(this.responseText);
  let seen = {}
  articles = articleRes.filter( article => {
    let url = article[0].url
    if(seen[url]) {
      return;
    } else {
      seen[url] = true;
      return article;
    }
  }).filter(article => {
    return article[1] > 2;
  })
}

//animation to close the popup
function closeAnimation() {

  let popupContainer = document.querySelectorAll('div.popupContainer')[0];

  let fadeOut = document.querySelectorAll('div.oblik-modal')[0];
  fadeOut.id ='fadeOut';

  let slideOut = document.querySelectorAll('div.oblik-content')[0];
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

      let html = document.querySelectorAll('html')[0];
      //popupContainer
      let popupContainer = document.createElement('div');
      popupContainer.classList.add('popupContainer');
      html.appendChild(popupContainer);

      //oblik-modal
      let modal = document.createElement('div');
      modal.classList.add('oblik-modal');
      // modal.style.display = "block";
      popupContainer.appendChild(modal);

      //oblik-content
      let modalContent = document.createElement('div');
      modalContent.classList.add('oblik-content');
      modal.appendChild(modalContent);

      //oblik-header
      let modalHeader = document.createElement('div');
      modalHeader.classList.add('oblik-header');
      modalContent.appendChild(modalHeader);

      //oblik-title
      let title = document.createElement('div');
      title.classList.add('oblik-title')
      title.innerHTML = "oblik";
      modalHeader.appendChild(title);

      //oblik-close
      let close = document.createElement('span');
      close.classList.add('oblik-close');
      close.innerHTML = '&times;';
      modalHeader.appendChild(close);

      //Onclick X to remove entire node
      var span = document.querySelectorAll("span.oblik-close")[0];
      span.onclick = function() {
        closeAnimation();
      }

      //'oblik-body'
      let modalBody = document.createElement('div');
      modalBody.classList.add('oblik-body');
      modalContent.appendChild(modalBody);

      console.log(articles);

      if(articles.length !== 0) {
      //Article Data
        for (let i = 0; i < articles.length; i++) {

            let articleDiv = document.createElement('div');
            if(articles[i][0].view === 'n/a') {
              articleDiv.classList.add('na');
            } else {
              articleDiv.classList.add(articles[i][0].view);
            }
            articleDiv.classList.add('articleDiv');
            modalBody.appendChild(articleDiv);

            let articleContainer = document.createElement('div');
            if(articles[i][0].view === 'n/a') {
              articleContainer.classList.add(`naContainer`);
            } else {
              articleContainer.classList.add(`${articles[i][0].view}Container`);
            }
            articleContainer.classList.add('articleContainer');
            articleContainer.onclick = function() {
              chrome.runtime.sendMessage({redirect: articles[i][0].url});
              chrome.runtime.sendMessage({"message": false});
            }
            articleDiv.appendChild(articleContainer);

            let viewTitle = document.createElement('h4');
            viewTitle.classList.add('viewTitle');
            viewTitle.innerHTML = articles[i][0].view
            articleContainer.appendChild(viewTitle)

            //image
            let articleImg = document.createElement('img');
            articleImg.classList.add('oblik-img');
            articleImg.src = articles[i][0].image;
            articleImg.alt = "Image not available";
            articleContainer.appendChild(articleImg);

            //title
            let articleTitle = document.createElement('div');
            articleTitle.classList.add('article-title');
            articleTitle.innerHTML = articles[i][0].title;
            articleContainer.appendChild(articleTitle);

            //source
            let articleSource = document.createElement('div');
            articleSource.classList.add('article-source');
            articleSource.innerHTML = articles[i][0].source;
            articleContainer.appendChild(articleSource);

        }
      } else if(articles.length === 0){
        console.log('hello');
        let noArticles = document.createElement('div');
        noArticles.classList.add('noArticles');
        noArticles.innerHTML = 'Sorry, we could not find any articles.';
        modalBody.appendChild(noArticles);
      } else {
        console.log('hello');
      }
      // click anywhere on the window to exit
      window.onclick = function(event) {
        if ( event.target.className !== 'oblik-content' &&
             event.target.className !== 'oblik-header' &&
             event.target.className !== 'oblik-body' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'oblik-img' &&
             event.target.className !== 'article-title' &&
             event.target.className !== 'article-source' &&
             event.target.className !== 'articleDiv' &&
             event.target.className !== 'articleContainer' &&
             event.target.className !== 'naContainer' &&
             event.target.className !== 'na' &&
             event.target.className !== 'leftContainer' &&
             event.target.className !== 'left' &&
             event.target.className !== 'center-leftContainer' &&
             event.target.className !== 'center-left' &&
             event.target.className !== 'centerContainer' &&
             event.target.className !== 'center' &&
             event.target.className !== 'center-rightContainer' &&
             event.target.className !== 'center-right' &&
             event.target.className !== 'rightContainer' &&
             event.target.className !== 'right'
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







