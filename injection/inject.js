chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'runFunction') {
    runit();
    sendResponse({ status: 'Function executed' });
  } else {
    stopit();
    sendResponse({ status: 'Function executed' });
  }
});

all_nodes = [];

function traverse(el_node) {
  el_node.childNodes.forEach((item) => {
    if (item.nodeType == 3 && item.textContent.length != 0) {
      all_nodes.push(item);
    } else {
      traverse(item);
    }
  });
}

function runit() {
  const selection = window.getSelection();

  traverse(document.body);

  all_nodes.forEach((textNode) => {
    if (textNode.textContent.length > 0) {
      const words = textNode.textContent.split(' ');
      const parent = textNode.parentNode;
      const parent_attribute = parent.getAttribute('class');

      const fragment = document.createDocumentFragment();

      words.forEach((word, index) => {
        const span = document.createElement('span');

        if (word.length > 1 && word != ' ') {
          const firstHalfWord = word.slice(0, Math.ceil(word.length / 2));
          span.style.fontWeight = 'bold';
          span.style.color = 'red';

          span.textContent = firstHalfWord;
          span.setAttribute('class', parent_attribute);
          fragment.appendChild(span);

          const remainText = document.createTextNode(
            word.slice(Math.ceil(word.length / 2))
          );
          fragment.appendChild(remainText);
        } else if (word.length == 1) {
          span.style.fontWeight = 'bold';
          span.style.color = 'red';

          span.textContent = word;
          span.setAttribute('class', parent_attribute);
          fragment.appendChild(span);
        }

        if (index < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '));
        }
      });

      parent.replaceChild(fragment, textNode);
    }
  });
}
function stopit() {
  document.body.innerText = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
}
