// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-VdCe6pgSqAPHvrjP0f8rJW97",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
const openai = require('openai');
// Set up your OpenAI API key
const apiKey = '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';
openai.apiKey = apiKey;
// Call the function to get all current tabs
let tabsUrl = getAllTabsUrl();
// Define your prompt
const prompt = `Please classify and group related urls ${tabsUrl}`;
// Set the parameters for the text generation
const parameters = {
  prompt: prompt,
  max_tokens: 100
};
// Call the OpenAI API to generate text
openai.Completions.create(parameters, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Generated text:', response.choices[0].text);
  }
});
/*
Define a function to get all current tabs in current window
*/
function getAllTabsUrl() {
  // Use chrome.tabs.query() to get all tabs
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    let tabsUrl = tabs.map(tab => tab.url);
    console.log(tabsUrl);
  });
};
