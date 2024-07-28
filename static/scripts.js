function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Add to handle default open tab or open specific tab on load
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tablink').click(); // Clicks the first tablink to open
});

function startTranslationSession() {
    var startWord = document.getElementById('startWord');
    var endWord = document.getElementById('endWord');

    var output = document.getElementById('consoleOutputTranslation');

    document.getElementById('startTranslation').disabled = true;
    document.getElementById('finishTranslation').disabled = false;
    document.getElementById('consoleInputTranslation').disabled = false;
    document.getElementById('consoleInputTranslation').focus()

    // Display the command in the console output
    output.textContent += "> Starting session with Start word: " + startWord.value + " and End word: " + endWord.value + "\n";

    // Send the data to the Flask server
    fetch('/start_translation_session', {
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

function finishTranslationSession() {
    document.getElementById('startTranslation').disabled = false;
    document.getElementById('finishTranslation').disabled = true;
    document.getElementById('consoleInputTranslation').disabled = true;
    document.getElementById('consoleInputTranslation').value = ''

    var output = document.getElementById('consoleOutputTranslation');

    fetch('/finish_translation_session', {
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

function sendTranslation() {
    var consoleInput = document.getElementById('consoleInputTranslation')

    var consoleValue = consoleInput.value

    consoleInput.value = ''

    var output = document.getElementById('consoleOutputTranslation');

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

function getCheckedDeclensions() {
    const checkboxes = document.querySelectorAll('#Declension .control-panel input[type="checkbox"]');
    let checkedValues = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value); // Add the value of checked checkbox to the array
        }
    });

//    console.log("Checked declensions:", checkedValues);
    return checkedValues;
}

function startDeclensionSession() {
    document.getElementById('startDeclension').disabled = true
    document.getElementById('finishDeclension').disabled = false

    document.getElementById('consoleInputDeclension').disabled = false
    document.getElementById('consoleInputDeclension').focus()

    let checkedValues = getCheckedDeclensions()

    let output = document.getElementById('consoleOutputDeclension')
    output.textContent += "> Starting session with declensions: " + checkedValues + "\n"

    console.log("Checked declensions to send:", checkedValues)

    fetch('/start_declension_session', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            declensions: checkedValues
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle response data here
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function finishDeclensionSession() {
    document.getElementById('startDeclension').disabled = false
    document.getElementById('finishDeclension').disabled = true
    document.getElementById('consoleInputDeclension').disabled = true
    document.getElementById('consoleInputDeclension').value = ''

    var output = document.getElementById('consoleOutputDeclension');

    fetch('/finish_declension_session', {
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

function sendDeclensionAnswer() {
    let consoleInput = document.getElementById('consoleInputDeclension')

    let consoleValue = consoleInput.value

    consoleInput.value = ''

    let output = document.getElementById('consoleOutputDeclension');

    fetch('/declension_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: consoleValue, word: "example (to be implemented)" })

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
