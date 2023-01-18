import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: AuthModule
})
export class AuthInterceptor implements HttpInterceptor {
  private tokenHeaderKey = 'Authorization';

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.authService.token;
    if (token !== null) {
      authRequest = authRequest.clone({ headers: request.headers.set(this.tokenHeaderKey, `Bearer ${token}`) });
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]