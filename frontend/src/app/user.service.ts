import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/api'; // Replace with your actual API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserByEmail(email: string) {
    const authToken = this.authService.getToken();

    //console.log('Auth token:', authToken);
    // Include the token in the authorization header
    const headers = new HttpHeaders({
      Authorization: authToken,
    });

    // Make the HTTP request to fetch user data
    return this.http.get('http://127.0.0.1:5000/api/users?email=' + email, { headers });
  }

  getUserByUsername(username: string): Observable<any> {
    // Send an HTTP GET request to retrieve user data by username
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }

  updateUser(user: any): Observable<any> {
    // Send an HTTP PUT request to update user data
    return this.http.put(`${this.apiUrl}/users/${user.username}`, user);
  }
}
