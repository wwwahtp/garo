chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'runFunction') {
    runit();
    sendResponse({ status: 'Function executed' });
  } else {
    stopit();
    sendResponse({ status: 'Function executed' });
  }
});

let all_nodes = [];

function traverse(el_node) {
  el_node.childNodes.forEach((item) => {
    if (item.nodeType == 3 && item.textContent.trim().length !== 0) {
      all_nodes.push(item);
    } else {
      traverse(item);
    }
  });
}

function runit() {
  traverse(document.body);

  all_nodes.forEach((textNode) => {
    const parent = textNode.parentNode;
    const originalText = textNode.textContent;
    const words = originalText.split(/\s+/);

    const fragment = document.createDocumentFragment();

    words.forEach((word, index) => {
      if (word.trim().length > 0) {
        const firstHalfWord = word.slice(0, Math.ceil(word.length / 2));
        const secondHalfWord = word.slice(Math.ceil(word.length / 2));

        const span2 = document.createElement('span');
        const span1 = document.createElement('span');
        span1.style.fontWeight = 'bold';
        //span1.style.color = 'red';
        span1.textContent = firstHalfWord;

        span2.style.fontWeight = 'lighter';
        span2.textContent = secondHalfWord;

        const textNode2 = document.createTextNode(secondHalfWord);

        if (parent.nodeName !== 'SPAN') {
          fragment.appendChild(span1);
          fragment.appendChild(span2);
        } else {
          fragment.appendChild(document.createTextNode(firstHalfWord));
          fragment.appendChild(textNode2);
        }

        if (index < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '));
        }
      } else {
        fragment.appendChild(document.createTextNode(' '));
      }
    });

    parent.replaceChild(fragment, textNode);
  });
}

function stopit() {
  location.href = location.href;
}
