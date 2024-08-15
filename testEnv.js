// Load environment variables from .env file
require('dotenv').config();

// Check if the OpenAI API key is loaded
const openaiApiKey = process.env.OPENAI_API_KEY;

// Log the OpenAI API key status
console.log('OpenAI API Key:', openaiApiKey ? 'Loaded' : 'Not Loaded');

// Optionally, print the first few characters of the API key for verification
if (openaiApiKey) {
    console.log('OpenAI API Key (first 5 characters):', openaiApiKey.substring(0, 5) + '...');
} else {
    console.error('OpenAI API Key is not set in the .env file.');
}

