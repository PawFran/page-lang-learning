function startSession() {
    var startWord = document.getElementById('startWord').value;
    var endWord = document.getElementById('endWord').value;

    var output = document.getElementById('consoleOutput');

//    var consoleType = '1';  // Set this according to your UI, '1' for Translation as example

    document.getElementById('finishButton').disabled = false;
    document.getElementById('startButton').disabled = true;

    // Display the command in the console output
    output.textContent += "> Starting session with Start word: " + startWord + " and End word: " + endWord + "\n";

    // Send the data to the Flask server
    fetch('/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start: startWord, end: endWord })
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

function finishSession() {
    document.getElementById('finishButton').disabled = true;
    document.getElementById('startButton').disabled = false;

    var output = document.getElementById('consoleOutput');

    fetch('/finish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ })
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
