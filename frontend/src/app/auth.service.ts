import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth/login';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const userAuth = {username: username, password: password};
    return this.httpClient.post(this.authUrl, userAuth, this.httpOptions);
  }
}
