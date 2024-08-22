const OpenAI = require('openai');

let openai;

async function initializeOpenAI(apiKey) {
  openai = new OpenAI({ apiKey });
}

async function generateSuggestions(text, apiKey) {
  await initializeOpenAI(apiKey);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an AI writing assistant for self-help books."},
        {role: "user", content: `Provide suggestions to improve the following text:\n\n${text}`}
      ],
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

async function expandContent(text, apiKey) {
  await initializeOpenAI(apiKey);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an AI writing assistant for self-help books. Your task is to expand on the given text, adding depth, examples, and additional insights."},
        {role: "user", content: `Please expand on the following text, adding more depth and detail:\n\n${text}`}
      ],
      temperature: 0.7,
    });
    return text + "\n\n" + response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

async function writeFromPrompt(prompt, apiKey) {
  await initializeOpenAI(apiKey);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an AI writing assistant for self-help books. Your task is to generate a section of a self-help book based on the given prompt."},
        {role: "user", content: `Write a section of a self-help book based on the following prompt:\n\n${prompt}`}
      ],
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

async function expandAiContent(content, apiKey) {
  await initializeOpenAI(apiKey);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an AI writing assistant for self-help books. Your task is to expand on the given content, adding depth and detail without being redundant. Focus on providing new insights, examples, or perspectives that complement the existing content."},
        {role: "user", content: `Please expand on the following content, adding more depth and detail without repeating information:\n\n${content}`}
      ],
      temperature: 0.7,
    });
    return content + "\n\n" + response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

module.exports = { generateSuggestions, expandContent, writeFromPrompt, expandAiContent };