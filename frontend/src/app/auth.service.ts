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
    return localStorage.getItem('access_token') || '';
  }

  // getUserName(): string{
  //   return sessionStorage.getItem(this.USER_DATA_KEY)?.at(3) || '';
  // }

  // getUserID(): string{
  //   return localStorage.getItem('user_id') || '';
  // }

  logout(): void {
    localStorage.removeItem('access_token');
    this.clearUserData()
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.loggedInUsernameSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
