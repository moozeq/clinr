import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { AuthModule } from './auth.module';
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: AuthModule
})
export class AuthService {
  private loginUrl: string;
  private registerUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private accessToken = '';
  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();

  constructor(private httpClient: HttpClient, private configService: ConfigService, private tokenStorage: TokenStorageService) {
    this.loginUrl = `${this.configService.backendUrl}/auth/login`;
    this.registerUrl = `${this.configService.backendUrl}/auth/register`;
  }

  login(username: string, password: string): Observable<any> {
    const userLogin = { username, password };
    return this.httpClient.post(this.loginUrl, userLogin, this.httpOptions).pipe(
      tap(res => this.tokenStorage.saveUserAndToken(res))
    );
  }

  set token(token: string) {
    this.tokenStorage.saveToken(token);
  }

  get token(): string {
    if (!this.accessToken) {
      this.accessToken = this.tokenStorage.getToken();
    }
    return this.accessToken;
  }

  checkStatus() {
    this.logged.next(Boolean(this.token));
  }

  logout(): Observable<any> {
    return of(this.tokenStorage.removeUserAndToken()).pipe(
      tap(() => {
        this.accessToken = '';
        this.logged.next(false);
      })
    );
  }

  register(username: string, password: string, name: string, email: string): Observable<any> {
    const userRegister = { username, password, name, email };
    return this.httpClient.post(this.registerUrl, userRegister, this.httpOptions);
  }
}
