import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModule } from './users.module';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {
  private usersApiUrl = 'http://localhost:3000/profile';

  constructor(private httpClient: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.httpClient.get(this.usersApiUrl);
  }
}
