import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatService } from '../../shared/services/chat';
import { AuthService } from '../../shared/services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
     RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css'
})
export class ChatWindow implements OnInit {
  conversations: any[] = [];
  messages: any[] = [];
  currentConversationId: number | null = null;
  newMessage = '';
  isLoading = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    this.chatService.getConversations().subscribe({
      next: (res: any) => {
        this.conversations = res.data;
      },
      error: () => {}
    });
  }

  newChat() {
    this.chatService.createConversation().subscribe({
      next: (res: any) => {
        this.conversations.unshift(res.data);
        this.selectConversation(res.data.id);
      },
      error: () => {}
    });
  }

  selectConversation(id: number) {
    this.currentConversationId = id;
    this.chatService.getMessages(id).subscribe({
      next: (res: any) => {
        this.messages = res.data;
      },
      error: () => {}
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.currentConversationId) return;

    const userMsg = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    this.messages.push({ role: 'user', content: userMsg });

    this.chatService.sendMessage(this.currentConversationId, userMsg).subscribe({
      next: (res: any) => {
        this.messages.push({ role: 'assistant', content: res.data.reply });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  logout() {
    this.authService.logout();
  }
}