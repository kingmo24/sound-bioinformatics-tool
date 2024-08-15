const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function testOpenAI() {
    try {
        const payload = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello, how are you?' }],
            max_tokens: 150,
        };

        const response = await axios.post(
            OPENAI_API_URL,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Response from OpenAI:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error contacting OpenAI:', error.message);
    }
}

testOpenAI();

