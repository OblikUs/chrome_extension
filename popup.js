let bgp = chrome.extension.getBackgroundPage()

document.getElementById('website').addEventListener('click', () =>{
  chrome.tabs.create({'url': 'https://www.google.com/'});

});

bgp.console.log('hi');