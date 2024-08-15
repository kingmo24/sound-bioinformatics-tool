document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    const button = document.querySelector('#sendButton');

    // Ensure event listener is attached only once
    button.addEventListener('click', sendMessage);

    // Load chat history from localStorage
    loadHistory();
});

async function sendMessage() {
    console.log('sendMessage Invoked');

    const input = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');

    // Guard clause to prevent sending empty messages
    if (input.value.trim() === '') return;

    // Get user message and clear input field
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

        // Make a POST request to the server
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessageContent })
        });

        // Log the response for debugging purposes
        console.log('Received Response:', response);

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Failed to connect to the server.');
        }

        // Parse the JSON response
        const data = await response.json();

        console.log('Assistant Response:', data.response);

        // Add the assistant's response to the chat window
        const assistantMessage = `<div class="message assistant-message"><strong>Bot:</strong> ${data.response}</div>`;
        appendMessage(assistantMessage);
    } catch (error) {
        console.error('Error:', error);

        // Display an error message to the user
        const errorMessage = `<div class="message assistant-message"><strong>Bot:</strong> An error occurred. Please try again.</div>`;
        appendMessage(errorMessage);
    }
}

function appendMessage(message) {
    console.log('Appending Message:', message);

    const chatHistory = document.getElementById('messages');

    // Append the message to the chat history
    chatHistory.innerHTML += message;

    // Save the updated chat history to localStorage
    localStorage.setItem('chatHistory', chatHistory.innerHTML);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function loadHistory() {
    // Retrieve chat history from localStorage
    const history = localStorage.getItem('chatHistory');
    if (history) {
        const chatHistory = document.getElementById('messages');

        // Load the chat history into the chat window
        chatHistory.innerHTML = history;

        // Scroll to the bottom of the chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

