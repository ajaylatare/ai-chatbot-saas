import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Headers mein token add karo
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }

  // Sab conversations lao
  getConversations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat/conversations`, {
      headers: this.getHeaders()
    });
  }

  // Naya conversation banao
  createConversation(): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/conversations`, {}, {
      headers: this.getHeaders()
    });
  }

  // Messages lao
  getMessages(conversationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat/messages/${conversationId}`, {
      headers: this.getHeaders()
    });
  }

  // Message bhejo
  sendMessage(conversationId: number, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/send`, {
      conversationId,
      message
    }, {
      headers: this.getHeaders()
    });
  }
}