import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUsernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public loggedInUsername$: Observable<string | null> = this.loggedInUsernameSubject.asObservable();
  private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null); 
  public userData$: Observable<any | null> = this.userDataSubject.asObservable(); 

  private readonly USER_DATA_KEY = 'userData';

  constructor() {}

  setUserData(userData: any): void {
    sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  getUserData(): any {
    const storedData = sessionStorage.getItem(this.USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearUserData(): void {
    sessionStorage.removeItem(this.USER_DATA_KEY);
  }

  getToken(): string {
    const header = localStorage.getItem('header');
    if (header){
      const tokenData = JSON.parse(header);
      if(this.hasAdminTokenKey()){
        const token = tokenData.admin_token;
        return token;
      }else{
        const token = tokenData.token;
        return token;
      }

      
    }
    return '';
  }

  hasAdminTokenKey(): boolean {
    const header = localStorage.getItem('header');

    if (header) {
      const tokenData = JSON.parse(header);
      const token = tokenData.admin_token;
      if (token) {
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }
  }
  // getUserName(): string{
  //   return sessionStorage.getItem(this.USER_DATA_KEY)?.at(3) || '';
  // }

  // getUserID(): string{
  //   return localStorage.getItem('user_id') || '';
  // }

  logout(): void {
    localStorage.removeItem('header');
    this.clearUserData()
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('studySpots');
    this.loggedInUsernameSubject.next(null);
  }

  isAuthenticated(): boolean {
    const header = localStorage.getItem('header');

    if (header) {
      const tokenData = JSON.parse(header);
      const expiresAt = new Date(tokenData.expires_in).getTime();
      // Check if the current time is before the expiration time
      // console.log(expiresAt)
      // console.log(Date.now())
      return Date.now() < expiresAt;
    } else {
      // header data not found in local storage
      return false;
    }
  }
}
