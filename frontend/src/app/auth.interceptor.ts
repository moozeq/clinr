import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenHeaderKey = 'Authorization';

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.tokenStorage.getToken();
    if (token !== null) {
      authRequest = authRequest.clone({headers: request.headers.set(this.tokenHeaderKey, `Bearer ${token}`)});
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {}
]