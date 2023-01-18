import { Injectable } from '@angular/core';
import { AuthModule } from './auth.module';

@Injectable({
  providedIn: AuthModule
})
export class TokenStorageService {
  private authTokenKey = 'auth-token';
  private authUserKey = 'auth-user';
  private storage = window.localStorage;

  constructor() { }

  removeUserAndToken(): void {
    this.storage.removeItem(this.authTokenKey);
    this.storage.removeItem(this.authUserKey);
  }

  saveUserAndToken(authResponse: any): void {
    this.saveToken(authResponse.accessToken);
    this.saveUser(authResponse.user);
  }

  saveToken(token: any): void {
    this.storage.setItem(this.authTokenKey, token);
  }

  getToken(): any {
    return this.storage.getItem(this.authTokenKey);
  }

  saveUser(user: any): void {
    this.storage.setItem(this.authUserKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = this.storage.getItem(this.authUserKey);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
