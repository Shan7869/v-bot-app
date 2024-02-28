import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userMessage: string = '';
  messages: { content: string, sender: string }[] = [];

  constructor(private chatbotService: ChatbotService) { }
  // key = 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
  ngOnInit(): void {
    // You can initialize the conversation here if needed
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ content: this.userMessage, sender: 'user' });

    this.chatbotService.sendMessage(this.userMessage)
      .then(response => {
        this.messages.push({ content: response, sender: 'bot' });
      });

    this.userMessage = '';
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    // Scroll to the bottom of the chat container
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}
