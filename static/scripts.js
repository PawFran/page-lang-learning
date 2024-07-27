function startSession() {
    var startWord = document.getElementById('startWord');
    var endWord = document.getElementById('endWord');

    var output = document.getElementById('consoleOutput');

    var startValue = startWord.value
    var endValue = endWord.value

    // clear input fields
//    startWord.value = '';
//    endWord.value = '';

//    var consoleType = '1';  // Set this according to your UI, '1' for Translation as example

    document.getElementById('startButton').disabled = true;
    document.getElementById('finishButton').disabled = false;
    document.getElementById('consoleInput').disabled = false;

    // Display the command in the console output
    output.textContent += "> Starting session with Start word: " + startValue + " and End word: " + endValue + "\n";

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
    document.getElementById('startButton').disabled = false;
    document.getElementById('finishButton').disabled = true;
    document.getElementById('consoleInput').disabled = true;
    document.getElementById('consoleInput').value = ''

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
        output.textContent += "\n" + data.response + "\n\n";
        output.scrollTop = output.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent += "Failed to process command.\n";
    });
}

function sendUserResponseServer() {
    var consoleInput = document.getElementById('consoleInput')

    var consoleValue = consoleInput.value

    consoleInput.value = ''

    var output = document.getElementById('consoleOutput');

    fetch('/translation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translation: consoleValue, word: "example (to be implemented)" })

    })
    .then(response => response.json())
    .then(data => {
        output.textContent += "\n" + data.response + "\n\n";
        output.scrollTop = output.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent += "Failed to process command.\n";
    });
}