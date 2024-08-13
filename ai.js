const axios = require('axios');

async function generateSuggestions(text) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "You are an AI writing assistant for self-help books."},
          {role: "user", content: `Provide suggestions to improve the following text:\n\n${text}`}
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating suggestions:', error.response ? error.response.data : error.message);
    return 'An error occurred while generating suggestions.';
  }
}

module.exports = { generateSuggestions };