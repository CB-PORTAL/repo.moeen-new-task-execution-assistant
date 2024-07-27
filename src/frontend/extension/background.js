chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "textSelected") {
        // Send selected text to backend for processing
        fetch('http://localhost:5000/process_instruction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({instruction: request.text}),
        })
        .then(response => response.json())
        .then(data => {
            // Send processed instruction back to content script for execution
            chrome.tabs.sendMessage(sender.tab.id, {action: "executeInstruction", instruction: data.processed_instruction});
        })
        .catch(error => console.error('Error:', error));
    }
});