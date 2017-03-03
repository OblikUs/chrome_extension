//sends URL to server
let url = {url: document.URL}
let getArticles = new XMLHttpRequest();
getArticles.open('POST', 'http://138.197.220.158/related-articles', true);
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
      return
    } else {
      seen[url] = true;
      return article
    }
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
      console.log('html: ', html);
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

      //Article Data
      for (let i = 0; i < articles.length; i++){
        console.log('articles[i][1]: ', articles[i][0]);

        //removes if article is the same as page
        if (articles[i][0].url === url.url) {
         let index = articles.indexOf(articles[i]);
         articles.splice(index, 1);
        }

        // removes if related is less than or equal to 1
        if (articles[i][1] <= 1 ){
          let index = articles.indexOf(articles[i][1]);
          articles.splice(index, 1);
        }

        //liberal
        if (articles[i][0].view === "center-left") {

          //Liberal
          let liberal = document.createElement('div');
          liberal.classList.add('liberal');
          liberal.innerHTML = articles[i][0].view;
          modalBody.appendChild(liberal);

          //liberalContainer
          let liberalContainer = document.createElement('div');
          liberalContainer.classList.add('liberalContainer');
          liberalContainer.onclick = function() {
            chrome.runtime.sendMessage({redirect: articles[i][0].url});
            chrome.runtime.sendMessage({"message": false});
          }
          liberal.appendChild(liberalContainer);

          //image
          let liberalImg = document.createElement('img');
          liberalImg.classList.add('oblik-img');
          liberalImg.src = articles[i][0].image;
          liberalContainer.appendChild(liberalImg);

          //title
          let titleLiberal = document.createElement('div');
          titleLiberal.classList.add('article-title');
          titleLiberal.innerHTML = articles[i][0].title;
          liberalContainer.appendChild(titleLiberal);

          //source
          let sourceLiberal = document.createElement('div');
          sourceLiberal.classList.add('article-source');
          sourceLiberal.innerHTML = articles[i][0].source;
          liberalContainer.appendChild(sourceLiberal);

        //center
        } else if (articles[i][0].view === "center") {

          //center
          let center = document.createElement('div');
          center.classList.add('center');
          center.innerHTML = articles[i][0].view;
          modalBody.appendChild(center);

          //centerContainer
          let centerContainer = document.createElement('div');
          centerContainer.classList.add('centerContainer');
          centerContainer.onclick = function() {
            chrome.runtime.sendMessage({redirect: articles[i][0].url});
            chrome.runtime.sendMessage({"message": false});
          }
          center.appendChild(centerContainer);

          //image
          let centerIMG = document.createElement('img');
          centerIMG.classList.add('oblik-img');
          centerIMG.src = articles[i][0].image;
          centerContainer.appendChild(centerIMG);

          //title
          let titleCenter = document.createElement('div');
          titleCenter.classList.add('article-title');
          titleCenter.innerHTML = articles[i][0].title;
          centerContainer.appendChild(titleCenter);

          //source
          let sourceCenter = document.createElement('div');
          sourceCenter.classList.add('article-source');
          sourceCenter.innerHTML = articles[i][0].source;
          centerContainer.appendChild(sourceCenter);

        //conservative
        } else if (articles[i][0].view === "center-right"){

          //conservative
          let conservative = document.createElement('div');
          conservative.classList.add('conservative');
          conservative.innerHTML = articles[i][0].view;
          modalBody.appendChild(conservative);

          //conservativeContainer
          let conservativeContainer = document.createElement('div');
          conservativeContainer.classList.add('conservativeContainer');
          conservativeContainer.onclick = function() {
            chrome.runtime.sendMessage({redirect: articles[i][0].url});
            chrome.runtime.sendMessage({"message": false});
          }
          conservative.appendChild(conservativeContainer);

          //image
          let conservativeImg = document.createElement('img');
          conservativeImg.classList.add('oblik-img');
          conservativeImg.src = articles[i][0].image;
          conservativeContainer.appendChild(conservativeImg);

          //title
          let titleConservative = document.createElement('div');
          titleConservative.classList.add('article-title');
          titleConservative.innerHTML = articles[i][0].title;
          conservativeContainer.appendChild(titleConservative);

          //source
          let sourceConservative = document.createElement('div');
          sourceConservative.classList.add('article-source');
          sourceConservative.innerHTML = articles[i][0].source;
          conservativeContainer.appendChild(sourceConservative);
        }
      }
      // click anywhere on the window to exit
      window.onclick = function(event) {
        console.log('event.target.className: ', event.target.className);
        if ( event.target.className !== 'oblik-content' &&
             event.target.className !== 'oblik-header' &&
             event.target.className !== 'oblik-body' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'oblik-title' &&
             event.target.className !== 'oblik-img' &&
             event.target.className !== 'article-title' &&
             event.target.className !== 'article-source' &&
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







