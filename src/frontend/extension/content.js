// Listen for text selections
document.addEventListener('mouseup', function() {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({action: "textSelected", text: selectedText});
    }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "executeInstruction") {
        // Here we'll implement the logic to execute instructions
        console.log("Executing instruction:", request.instruction);
        // Placeholder for actual execution logic
        sendResponse({status: "Instruction received, execution not yet implemented"});
    }
});