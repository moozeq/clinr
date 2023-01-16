import { Injectable } from '@angular/core';
import { LoggedUser, LoggedUserDto } from './dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private authTokenKey = 'auth-token';
  private authUserKey = 'auth-user';
  private storage = window.localStorage;

  constructor() { }

  signOut(): void {
    this.storage.removeItem(this.authTokenKey);
    this.storage.removeItem(this.authUserKey);
  }

  saveToken(token: string): void {
    this.storage.setItem(this.authTokenKey, token);
  }

  getToken(): string | null {
    return this.storage.getItem(this.authTokenKey);
  }

  saveUser(user: LoggedUser): void {
    this.storage.setItem(this.authUserKey, JSON.stringify(user));
  }

  getUser(): LoggedUser | null {
    const user = this.storage.getItem(this.authUserKey);
    if (user) {
      return new LoggedUser(JSON.parse(user) as LoggedUserDto);
    }
    return null;
  }
}
