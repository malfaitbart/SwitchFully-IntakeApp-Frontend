import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserToken = this.authenticationService.currentUserTokenValue;
    if (currentUserToken) {
        // ok
        return true;
    }

    // not ok  => redirect to login + return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
}