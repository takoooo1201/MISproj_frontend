import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string | null = null;
  private password: string | null = null;

  // Use sessionStorage for persistence
  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  }

  getCredentials(): { username: string | null; password: string | null } {
    return {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
    };
  }

  clearCredentials(): void {
    this.username = null;
    this.password = null;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }
}
