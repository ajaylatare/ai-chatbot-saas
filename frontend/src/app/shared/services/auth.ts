 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Register
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { name, email, password });
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Token save karo
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Token lao
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Logged in hai ya nahi
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  upgradePlan(): Observable<any> {
  const token = this.getToken();
  const headers = { authorization: `Bearer ${token}` };
  return this.http.post(`${this.apiUrl}/subscription/upgrade`, {}, { headers });
}

  getProfile(): Observable<any> {
  const token = this.getToken();
  const headers = { authorization: `Bearer ${token}` };
  return this.http.get(`${this.apiUrl}/user/profile`, { headers });
}
}