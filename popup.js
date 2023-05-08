const toggleSwitch = document.getElementById('toggleSwitch');

chrome.storage.sync.get('enabled', data => {
  toggleSwitch.checked = data.enabled;
});

toggleSwitch.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggleSwitch.checked }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'toggleChanged' });
      chrome.tabs.reload(tabs[0].id);
    });
  });
});
