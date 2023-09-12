import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoginPage: boolean = false;
  isSignUpPage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
