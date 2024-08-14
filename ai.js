const axios = require('axios');

async function callOpenAI(messages) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: messages,
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
    console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
    throw new Error('An error occurred while generating content.');
  }
}

async function generateSuggestions(text) {
  const messages = [
    {role: "system", content: "You are an AI writing assistant for self-help books."},
    {role: "user", content: `Provide suggestions to improve the following text:\n\n${text}`}
  ];
  return await callOpenAI(messages);
}

async function expandContent(text) {
  const messages = [
    {role: "system", content: "You are an AI writing assistant for self-help books. Your task is to expand on the given text, adding depth, examples, and additional insights."},
    {role: "user", content: `Please expand on the following text, adding more depth and detail:\n\n${text}`}
  ];
  return await callOpenAI(messages);
}

async function writeFromPrompt(prompt) {
  const messages = [
    {role: "system", content: "You are an AI writing assistant for self-help books. Your task is to generate a section of a self-help book based on the given prompt."},
    {role: "user", content: `Write a section of a self-help book based on the following prompt:\n\n${prompt}`}
  ];
  return await callOpenAI(messages);
}

module.exports = { generateSuggestions, expandContent, writeFromPrompt };