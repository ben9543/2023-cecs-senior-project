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
  username: string = '';
  isMainNavOpen = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void {

    console.log('Username from header', this.username);
    console.log('HeaderComponent initialized!');
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login');
      this.isSignUpPage = event.urlAfterRedirects.includes('/signup');
      console.log('isLoginPage:', this.isLoginPage);
      console.log('isSignUpPage:', this.isSignUpPage);
      console.log('Event:', event);
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
