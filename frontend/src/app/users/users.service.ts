import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { UsersModule } from './users.module';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {
  user: any;
  profileApiUrl: string;
  usersApiUrl: string;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.profileApiUrl = `${this.configService.backendUrl}/profile`;
    this.usersApiUrl = `${this.configService.backendUrl}/users`;
  }

  getCurrentUserProfile(): Observable<any> {
    return this.httpClient.get(this.profileApiUrl).pipe(
      tap(user => this.user = user)
    );
  }

  getCurrentUser(): Observable<any> {
    if (!this.user) {
      return this.getCurrentUserProfile().pipe(
        switchMap(user => {
          const currentUserUuid = user.uuid;
          return this.httpClient.get(`${this.usersApiUrl}/${currentUserUuid}`)
        })
      )
    } else {
      const currentUserUuid = this.user.uuid;
      return this.httpClient.get(`${this.usersApiUrl}/${currentUserUuid}`)
    }
  }
}
