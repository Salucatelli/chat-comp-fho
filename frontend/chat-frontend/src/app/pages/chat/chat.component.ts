import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = ''; // message to be sent
  messages: string[] = []; // list of messages

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Receive messages from the server
    this.chatService.onMessage((msg: string, user: string) => {
      this.messages.push(user + ": " + msg);
    });
  }

  // Sends a message
  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.message, "eu");
      this.message = ''; // limpa input
    }
  }
}
