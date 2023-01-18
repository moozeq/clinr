import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { UsersModule } from './users.module';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {
  user: any;
  profileApiUrl: string;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.profileApiUrl = `${this.configService.backendUrl}/profile`;
  }

  getUserProfile(): Observable<any> {
    return this.httpClient.get(this.profileApiUrl).pipe(
      tap(user => this.user = user)
    );
  }
}
