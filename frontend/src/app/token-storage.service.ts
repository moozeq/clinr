import { Injectable } from '@angular/core';
import { LoggedUser, LoggedUserDto } from './dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private authTokenKey = 'auth-token';
  private authUserKey = 'auth-user';
  constructor() { }

  signOut(): void {
    window.sessionStorage.removeItem(this.authTokenKey);
    window.sessionStorage.removeItem(this.authUserKey);
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem(this.authTokenKey, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.authTokenKey);
  }

  saveUser(user: LoggedUser): void {
    window.sessionStorage.setItem(this.authUserKey, JSON.stringify(user));
  }

  getUser(): LoggedUser | null {
    const user = window.sessionStorage.getItem(this.authUserKey);
    if (user) {
      return new LoggedUser(JSON.parse(user) as LoggedUserDto);
    }
    return null;
  }
}
