chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "executeWithMoeen") {
    fetch('http://localhost:5000/process_instruction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({instruction: request.text}),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Processed instruction:", data.processed_instruction);
      // Implement execution logic here
    })
    .catch(error => console.error('Error:', error));
  }
});
