import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { RequestedSpotDTO } from './DTOs/requested-spot.dto';
import { Observable } from 'rxjs';
import { APIResponse } from './DTOs/TypicalAPIResponse.dto';

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

  getRequestedStudySpots(){
    return this.http.get(`${this.apiUrl}/requests/get_requested_spots`);
  }

  getRequestedStudySpotByName(name: string){
    return this.http.get(`${this.apiUrl}/requests/get_requested_spot_by_name`, { params: { 'name': name } });
  }

  approveStudyspot(approveRequest: RequestedSpotDTO){
    return this.http.post(`${this.apiUrl}/admin/approve`, approveRequest);
  }
}
