const button_onOff_el = document.getElementById('button_onOff');

document.getElementById('button_onOff').addEventListener('click', () => {
  if (document.getElementById('button_onOff').innerText == 'OFF') {
    button_onOff_el.innerText = 'ON';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: 'runFunction' },
        (reponse) => {
          if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
          } else {
            alert('button1 성공');
          }
        }
      );
    });
  } else if (document.getElementById('button_onOff').innerText == 'ON') {
    button_onOff_el.innerText = 'OFF';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: 'stopFunction' },
        (reponse) => {
          if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
          } else {
            alert('button2 성공');
          }
        }
      );
    });
  }
});

/*
function OnFunction() {
  chrome.tabs.sendMessage({ message: 'runFunction' }, (response) => {
    if (chrome.runtime.lastError) {
      alert('button.js 에러');
    } else {
      alert('button.js 에러 X 성공');
    }
  });
}
function Off() {
  chrome.runtime.sendMessage({ message: 'stopFunction' });
}
  */
