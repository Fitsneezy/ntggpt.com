document.addEventListener('DOMContentLoaded', () => {
    // Toggle Developer Menu
    document.getElementById('dev-menu-toggle').addEventListener('click', () => {
        document.getElementById('dev-menu').classList.toggle('hidden');
    });

    // Toggle Settings Menu
    document.getElementById('settings-toggle').addEventListener('click', () => {
        document.getElementById('settings-menu').classList.toggle('hidden');
    });

    // Toggle NG GPTs Section
    document.getElementById('ng-gpt-toggle').addEventListener('click', () => {
        document.getElementById('ng-gpt-section').classList.toggle('hidden');
    });

    // Send Message
    document.getElementById('send-message').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.textContent = message;
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
