
// Import Axios
import { Injectable } from '@angular/core';
import axios from 'axios';

// Define your API key
const apiKey = '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';

// Define the URL for the completion endpoint
const apiUrl = 'https://api.openai.com/v1/completions';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor() { }

// Method to send a message to the chatbot
sendMessage(message: string): Promise<string> {
  // Define the request body
  const requestBody = {
    model: "babbage-002", // Use the text-davinci-002 model
    prompt: message,
    max_tokens: 50 // Or adjust as needed
  };

  // Define request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Make a POST request to the ChatGPT API
  return axios.post(apiUrl, requestBody, { headers })
    .then(response => {
      // Extract and return the bot's response
      console.log(response)
      return response.data.choices[0].text;
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      return 'Sorry, something went wrong.';
    });
}

}