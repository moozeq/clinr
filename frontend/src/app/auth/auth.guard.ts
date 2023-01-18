import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Boolean(this.authService.isLogged)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
