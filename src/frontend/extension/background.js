chrome.contextMenus.create({
    id: "executeWithMoeen",
    title: "Execute with Moeen",
    contexts: ["selection"]
  });
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "executeWithMoeen") {
      const selectedText = info.selectionText;
      
      // First, open the Control Center
      chrome.tabs.create({ url: chrome.runtime.getURL("control_center.html") }, (newTab) => {
        // Then, process the instruction
        processInstruction(selectedText, newTab.id);
      });
    }
  });
  function processInstruction(instruction, tabId) {
    fetch('http://localhost:5000/process_instruction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction: instruction })
    })
    .then(response => response.json())
    .then(data => {
      // Send processed instruction to Control Center
      chrome.tabs.sendMessage(tabId, {
        action: "displayProcessedInstruction",
        instruction: data
      });
    })
    .catch(error => console.error('Error:', error));
  }