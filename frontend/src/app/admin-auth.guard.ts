import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Replace with your authentication service

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.hasAdminTokenKey() && this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.logout()
      // Redirect unauthenticated users to a login page or another page.
      this.router.navigate(['/adminonlylogin']);
      return false;
    }
  }
}
