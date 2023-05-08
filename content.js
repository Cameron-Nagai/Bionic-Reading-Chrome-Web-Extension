function makeFirstThreeLettersBold(text) {
    const words = text.split(' ');
    const boldWords = words.map(word => {
      if (word.length > 2) {
        return `<span class="first-three-bold">${word.slice(0, 3)}</span>${word.slice(3)}`;
      }
      return word;
    });
    return boldWords.join(' ');
  }
  
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const newText = makeFirstThreeLettersBold(node.textContent);
      const newNode = document.createElement('span');
      newNode.innerHTML = newText;
      node.replaceWith(newNode);
    } else {
      node.childNodes.forEach(child => processNode(child));
    }
  }
  
  function applyPlugin() {
    chrome.storage.sync.get('enabled', data => {
      if (data.enabled) {
        processNode(document.body);
      }
    });
  }
  
  applyPlugin();
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'toggleChanged') {
      applyPlugin();
    }
  });
  