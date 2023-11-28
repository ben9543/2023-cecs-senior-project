import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoginPage: boolean = false;
  isSignUpPage: boolean = false;
  isResetPasswordPage: boolean = false;
  isResetLinkPage: boolean = false;
  userData!: UserData;
  username!: string;
  isMainNavOpen = false;
  isCheckInPage: boolean = false;
  isAdminLoginPage: boolean = false;
  isAdminHomePage: boolean = false;
  isLandingPage: boolean = false;
  isRequestedSpotView: boolean = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login');
      this.isSignUpPage = event.urlAfterRedirects.includes('/signup');
      this.isResetPasswordPage = event.urlAfterRedirects.includes('/reset-password');
      this.isResetLinkPage = event.urlAfterRedirects.includes('/reset-link');
      this.isCheckInPage = event.urlAfterRedirects.includes('/check-in');
      this.isAdminLoginPage = event.urlAfterRedirects.includes('/adminonlylogin');
      this.isAdminHomePage = event.urlAfterRedirects.includes('/admin-home');
      this.isLandingPage = event.urlAfterRedirects.includes('/welcome');
      this.isRequestedSpotView = event.urlAfterRedirects.includes('/requested-spot-view')
      if(event.urlAfterRedirects.includes('/home')){
        this.userData = this.authService.getUserData();
        this.username = this.userData?.user_name;
      }
    });
  }
  toggleMainNav() {
    this.isMainNavOpen = !this.isMainNavOpen;
  }
  closeMainNav() {
    this.isMainNavOpen = false;
  }
  logRouterLink(): void {
    console.log('Router Link:', '/settings/' + this.username);
  }
}
