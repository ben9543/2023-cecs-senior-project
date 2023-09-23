import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';

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
  username: string = '';

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void {

    console.log('Username from header', this.username);
    console.log('HeaderComponent initialized!');
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login');
      this.isSignUpPage = event.urlAfterRedirects.includes('/signup');
      this.isResetPasswordPage = event.urlAfterRedirects.includes('/reset-password');
      this.isResetLinkPage = event.urlAfterRedirects.includes('/reset-link');
      console.log('isLoginPage:', this.isLoginPage);
      console.log('isSignUpPage:', this.isSignUpPage);
      console.log('isResetPasswordPage:', this.isResetPasswordPage);
      console.log('isResetLinkPage:', this.isResetLinkPage);
      console.log('Event:', event);
    });
  }

  logRouterLink(): void {
    console.log('Router Link:', '/settings/' + this.username);
  }
}
