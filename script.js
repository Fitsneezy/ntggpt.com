document.addEventListener('DOMContentLoaded', () => {
    let definitions = [];

    // Load definitions from definitions.json
    fetch('definitions.json')
        .then(response => response.json())
        .then(data => {
            definitions = data;
            console.log('Definitions loaded:', definitions);
        })
        .catch(error => console.error('Error loading definitions:', error));

    // Existing code for other functionalities

    // Function to get definition of a word
    function getDefinition(word) {
        const entry = definitions.find(def => def.word.toLowerCase() === word.toLowerCase());
        return entry ? entry.definition : "Definition not found.";
    }

    // Send Message
    document.getElementById('send-message').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');

            // Check if message is a request for a definition
            if (message.startsWith('define ')) {
                const word = message.substring(7).trim();
                messageElement.textContent = getDefinition(word);
            } else {
                messageElement.textContent = message;
            }

            chatBox.appendChild(messageElement);
            input.value = '';
        }
    });

    // Save Chat
    document.getElementById('save-chat').addEventListener('click', () => {
        const chatBox = document.getElementById('chat-box');
        const messages = chatBox.querySelectorAll('.chat-message');
        const chatData = Array.from(messages).map(msg => msg.textContent).join('\n');
        
        // Create a .ntggpt file
        const blob = new Blob([chatData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat.ntggpt';
        a.click();
        URL.revokeObjectURL(url);
    });
});
