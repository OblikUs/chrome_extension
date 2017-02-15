

// chrome.runtime.sendMessage(document.URL);

if (document.domain === "www.bbc.com") {
  chrome.runtime.sendMessage(
    document.querySelector('meta[property="og:description"]').content
  );
}

console.log('hello')