

let url = {
  url: document.URL
}

let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/', true);
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.send(JSON.stringify(url));


console.log('url: ', url);


// //Request to get data
//   var oReq = new XMLHttpRequest();
//   oReq.addEventListener("readystatechange", getData);
//   oReq.open("GET", "https://www.reddit.com/r/aww/.json");
//   oReq.send();

//   //data from aww
//   function getData(){
//   console.log(this.readyState);
//   var aww = JSON.parse(this.readyState);
//   console.log('aww: ', aww.data);
//   }

// //bbc
// if (document.domain === "www.bbc.com") {
//   chrome.runtime.sendMessage(
//     document.querySelector('meta[property="og:description"]').content
//   );


//   // just place a div at top right
//   var body = document.getElementsByClassName('body-content');
//   console.log('body: ', body);
//   var div = document.createElement('div');
//   div.style.fontSize = '2em';
//   div.textContent = 'Injected!';
//   div.style.backgroundColor = 'green';
//   div.style.width = '100px';
//   div.style.height = '100px';
//   body[0].appendChild(div);

//   alert('inserted');

// }

// //reuters
// if (document.domain === "www.reuters.com") {
//   chrome.runtime.sendMessage(
//     document.querySelector('meta[property="og:description"]').content
//   );


//   // just place a div at top right
//   var body = document.getElementById('article-text');
//   console.log('body: ', body);
//   var div = document.createElement('div');
//   div.style.fontSize = '2em';
//   div.textContent = 'Injected!';
//   div.style.backgroundColor = 'green';
//   // div.style.width = 100px;
//   // div.style.height = 100px;
//   body.appendChild(div);

//   alert('inserted self... giggity');


// }






