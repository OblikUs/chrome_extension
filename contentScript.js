

// chrome.runtime.sendMessage(document.URL);

//bbc
if (document.domain === "www.bbc.com") {
  chrome.runtime.sendMessage(
    document.querySelector('meta[property="og:description"]').content
  );

  // just place a div at top right
  var body = document.getElementsByClassName('body-content');
  console.log('body: ', body);
  var div = document.createElement('div');
  div.style.fontSize = '2em';
  div.textContent = 'Injected!';
  div.style.backgroundColor = 'green';
  // div.style.width = 100px;
  // div.style.height = 100px;
  body[0].appendChild(div);

  alert('inserted');

}

//reuters
if (document.domain === "www.reuters.com") {
  chrome.runtime.sendMessage(
    document.querySelector('meta[property="og:description"]').content
  );



  // just place a div at top right
  var body = document.getElementById('article-text');
  console.log('body: ', body);
  var div = document.createElement('div');
  div.style.fontSize = '2em';
  div.textContent = 'Injected!';
  div.style.backgroundColor = 'green';
  // div.style.width = 100px;
  // div.style.height = 100px;
  body.appendChild(div);

  alert('inserted self... giggity');


}






console.log('hello')