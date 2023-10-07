import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://ec2-13-57-233-1.us-west-1.compute.amazonaws.com:5000/api'; // Replace with your actual API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserByEmail(email: string) {
    const authToken = this.authService.getToken();

    //console.log('Auth token:', authToken);
    // Include the token in the authorization header
    const headers = new HttpHeaders({
      Authorization: authToken,
    });

    // Make the HTTP request to fetch user data
    return this.http.get(`${this.apiUrl}/users?email=` + email, { headers });
  }

  getUserByUsername(username: string): Observable<any> {
    // Send an HTTP GET request to retrieve user data by username
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }
  // Update user data
  changePassword(updatedUserData: any) {
    const updateUrl = `${this.apiUrl}/change-password`;

    // Send an HTTP PUT request to the update user endpoint
    return this.http.put(updateUrl, updatedUserData);
  }
  // Update user data
  updateUser(updatedUserData: any) {
    const updateUrl = `${this.apiUrl}/update-user`;

    return this.http.put(updateUrl, updatedUserData);
  }

  // check if username is available
checkUsername(username: string, currentUserId: number | null = null) {
  // Define the API endpoint URL
  const apiUrl = `${this.apiUrl}/check-username`;

  const requestData = { username, currentUserId };

  // Send a POST request to the API endpoint
  return this.http.post(apiUrl, requestData);
}

// check if email is available
checkEmail(email: string, currentUserId: number | null = null) {
  // Define the API endpoint URL
  const apiUrl = `${this.apiUrl}/check-email`;

  const requestData = { email, currentUserId };

  // Send a POST request to the API endpoint
  return this.http.post(apiUrl, requestData);
}
}
