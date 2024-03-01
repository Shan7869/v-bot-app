import { Injectable } from '@angular/core';


import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  count: number = 0;
  constructor() { }

  sendMessage(message: string): Promise<string> {
    // Check if the message is found in the mock data
    if (this.isMessageFoundInMockData(message)) {
      // Return response from mock data
      return this.getMockResponse(message);
    } else {
      // Call actual API
      return this.getApiResponse(message);
    }
  }

  private isMessageFoundInMockData(message: string): boolean {
    // Define your mock data here
    const mockData: { [key: string]: string } = {
      "hello": "Hello! How can I assist you?",
      "hi": "Hi Buddy!",
      "how are you": "Ask my master, but thanks for asking!",
      "who are you": "I'm a chatbot of Shan Verma here to help you.",
      "i love you": "Gelchode",
      "what's up": "Not much, just here to chat.",
      "good morning": "Good morning! How can I help you today?",
      "good afternoon": "Good afternoon! What can I do for you?",
      "good evening": "Good evening! Let me know if you need assistance.",
      "bye": "Goodbye! Take care.",
      "see you later": "See you later! Have a great day.",
      "thanks": "You're welcome!",
      "thank you": "No problem! Let me know if you need anything else.",
      "help": "Sure, I'm here to help. What do you need assistance with?",
      "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
      "tell me a story": "Once upon a time, in a faraway land...",

    };

    // Check if the message exists in the mock data
    return Object.keys(mockData).includes(message.toLowerCase());
  }

  private getMockResponse(message: string): Promise<string> {
    // Return the corresponding mock response
    const mockData: { [key: string]: string } = {
      "hello": "Hello! How can I assist you?",
      "hi": "Hi Buddy!",
      "how are you": "Ask my master, but thanks for asking!",
      "who are you": "I'm a chatbot of Shan Verma here to help you.",
      "i love you": "Gelchode",
      "what's up": "Not much, just here to chat.",
      "good morning": "Good morning! How can I help you today?",
      "good afternoon": "Good afternoon! What can I do for you?",
      "good evening": "Good evening! Let me know if you need assistance.",
      "bye": "Goodbye! Take care.",
      "see you later": "See you later! Have a great day.",
      "thanks": "You're welcome!",
      "thank you": "No problem! Let me know if you need anything else.",
      "help": "Sure, I'm here to help. What do you need assistance with?",
      "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
      "tell me a story": "Once upon a time, in a faraway land..."
    };
    return Promise.resolve(mockData[message.toLowerCase()]);
  }

  private getApiResponse(message: string): Promise<string> {
    const requestBody = {
      model: "babbage-002",
      prompt: message,
      max_tokens: 50
    };
    const apiKey = environment.apiKey;


    const headers = {
      'Content-Type': 'application/json',
      // Replace 'YOUR_API_KEY' with your actual API key
      'Authorization': `Bearer ` + apiKey
    };

    return axios.post('https://api.openai.com/v1/completions', requestBody, { headers })
      .then(response => {
        return response.data.choices[0].text;
      })
      .catch(error => {
        console.error('Error:', error);
        this.count++;
        if (this.count > 5) {
          return 'mamu nahi ho re hai, time lgega'
        }
        if (this.count > 1 && this.count < 6) {
          return 'Abhi thik krke deta hu.';
        }


        return 'Sorry yrrr, kuch ulta seedha ho re la hai.';

      });
  }
}
