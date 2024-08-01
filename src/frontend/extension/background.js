chrome.contextMenus.create({
  id: "executeWithMoeen",
  title: "Execute with Moeen",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "executeWithMoeen") {
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