import { Injectable } from '@angular/core';
import { LoggedUserDto } from './dto/user.dto';

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

  saveUser(user: LoggedUserDto): void {
    window.sessionStorage.setItem(this.authUserKey, JSON.stringify(user));
  }

  getUser(): LoggedUserDto | null {
    const user = window.sessionStorage.getItem(this.authUserKey);
    if (user) {
      return JSON.parse(user) as LoggedUserDto;
    }
    return null;
  }
}
