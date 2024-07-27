document.getElementById('startBtn').addEventListener('click', function() {
    var startWord = document.getElementById('startWord').value;
    var endWord = document.getElementById('endWord').value;
    var consoleArea = document.getElementById('consoleArea');

    // Toggle console visibility
    consoleArea.style.display = consoleArea.style.display === 'none' ? 'block' : 'none';

    // Send the start and end words to the server
    fetch('/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startWord: startWord, endWord: endWord })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally handle the response from the server
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function sendToServer() {
    var input = document.getElementById('consoleInput');
    var output = document.getElementById('consoleOutput');
    var command = input.value;
    var consoleType = '1';  // Set this according to your UI, '1' for Translation as example

    input.value = ''; // Clear input after grabbing value

    // Display the command in the console output
    output.textContent += "> " + command + "\n";

    // Send the data to the Flask server
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: command, type: consoleType })
    })
    .then(response => response.json())
    .then(data => {
        output.textContent += data.response + "\n";
        output.scrollTop = output.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent += "Failed to process command.\n";
    });
}
