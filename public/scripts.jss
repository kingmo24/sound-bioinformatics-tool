document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const button = document.querySelector('#sendButton');
    button.addEventListener('click', sendMessage);
    loadHistory();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // File upload toggle
    const toggleFileUpload = document.getElementById('toggleFileUpload');
    toggleFileUpload.addEventListener('click', () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    });

    // File input change event
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);

    // Clear chat
    const clearChatButton = document.getElementById('clearChat');
    clearChatButton.addEventListener('click', clearChat);

    // Export chat
    const exportChatButton = document.getElementById('exportChat');
    exportChatButton.addEventListener('click', exportChat);
});

async function sendMessage() {
    console.log('sendMessage Invoked');

    const input = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');

    if (input.value.trim() === '') return;

    const userMessageContent = input.value.trim();
    input.value = '';

    console.log('User Message:', userMessageContent);

    // Add user message to the chat window
    const userMessage = `<div class="message user-message"><strong>You:</strong> ${userMessageContent}</div>`;
    appendMessage(userMessage);

    // Scroll to the bottom of the messages
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        console.log('Sending POST Request');

        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessageContent })
        });

        console.log('Received Response:', response);

        if (!response.ok) {
            throw new Error('Failed to connect to the server.');
        }

        const data = await response.json();

        console.log('Assistant Response:', data.response);

        // Add the assistant's response to the chat window
        const assistantMessage = `<div class="message assistant-message"><strong>Sound Marketing AI:</strong> ${data.response}</div>`;
        appendMessage(assistantMessage);
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = `<div class="message assistant-message"><strong>Sound Marketing AI:</strong> An error occurred. Please try again.</div>`;
        appendMessage(errorMessage);
    }
}

function appendMessage(message) {
    console.log('Appending Message:', message);

    const chatHistory = document.getElementById('messages');
    chatHistory.innerHTML += message;
    localStorage.setItem('chatHistory', chatHistory.innerHTML);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function loadHistory() {
    const history = localStorage.getItem('chatHistory');
    if (history) {
        const chatHistory = document.getElementById('messages');
        chatHistory.innerHTML = history;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    const themeToggle = document.getElementById('themeToggle');
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const fileNameDisplay = `<div class="message assistant-message"><strong>Sound Marketing AI:</strong> File "${file.name}" uploaded.</div>`;
        appendMessage(fileNameDisplay);

        // Reset file input after use
        event.target.value = '';
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat?')) {
        localStorage.removeItem('chatHistory');
        document.getElementById('messages').innerHTML = '';
    }
}

function exportChat() {
    const chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        const blob = new Blob([chatHistory], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat_history.txt';
        link.click();
    } else {
        alert('No chat history to export.');
    }
}

