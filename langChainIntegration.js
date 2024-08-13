const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');

// No need to call require('dotenv').config() here, as it's already done in main.js

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7
});

const generateSuggestions = async (text) => {
  const prompt = PromptTemplate.fromTemplate(
    "As an AI writing assistant for self-help books, provide suggestions to improve the following text:\n\n{text}\n\nSuggestions:"
  );

  const chain = new LLMChain({ llm, prompt });
  const result = await chain.call({ text });
  return result.text;
};

const generateContent = async (prompt) => {
  const contentPrompt = PromptTemplate.fromTemplate(
    "Generate a self-help book chapter based on the following prompt. The chapter should be approximately 2000 words long:\n\n{prompt}\n\nChapter:"
  );

  const chain = new LLMChain({ llm, prompt: contentPrompt });
  let fullContent = '';
  const totalWords = 60000;
  const wordsPerChapter = 2000;
  const chaptersNeeded = Math.ceil(totalWords / wordsPerChapter);

  for (let i = 0; i < chaptersNeeded; i++) {
    const result = await chain.call({ prompt });
    fullContent += result.text + '\n\n';
    // Here you would update the progress for the user
  }

  return fullContent;
};

const checkGrammarAndStyle = async (text) => {
  const prompt = PromptTemplate.fromTemplate(
    "Check the following text for grammar and style issues, providing corrections and explanations:\n\n{text}\n\nCorrections and explanations:"
  );

  const chain = new LLMChain({ llm, prompt });
  const result = await chain.call({ text });
  return result.text;
};

module.exports = {
  generateSuggestions,
  generateContent,
  checkGrammarAndStyle
};