chrome.contextMenus.create({
    id: "executeWithMoeen",
    title: "Execute with Moeen",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "executeWithMoeen") {
      // Check if Control Center is already open
      chrome.tabs.query({ url: chrome.runtime.getURL("control_center.html") }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.update(tabs[0].id, { active: true });
        } else {
          chrome.tabs.create({ url: chrome.runtime.getURL("control_center.html") });
        }
      });
  
      const selectedText = info.selectionText;
      fetch('http://localhost:5000/process_instruction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: selectedText })
      })
      .then(response => response.json())
      .then(data => {
        chrome.tabs.sendMessage(tab.id, {
          action: "executeInstruction",
          instruction: data
        });
      })
      .catch(error => console.error('Error:', error));
    }
  });