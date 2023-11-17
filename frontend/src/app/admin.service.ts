import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password
    };

    // Send a POST request to your API for login
    return this.http.post(`${this.apiUrl}/admin/login`, loginData);
  }
}
