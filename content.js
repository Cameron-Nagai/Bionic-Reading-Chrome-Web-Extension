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
    const parent = node.parentNode;
    const boldText = makeFirstThreeLettersBold(node.textContent);
    const newNode = document.createElement('span');
    newNode.innerHTML = boldText;
    parent.replaceChild(newNode, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (!['SCRIPT', 'STYLE', 'BUTTON', 'TEXTAREA', 'SELECT', 'SVG'].includes(node.tagName)) {
      node.childNodes.forEach(child => processNode(child));
    }
  }
}

processNode(document.body);

const style = document.createElement('style');
style.textContent = `
  .first-three-bold {
    font-weight: 900;
  }
`;
document.head.appendChild(style);
