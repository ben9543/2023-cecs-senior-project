import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudyspotService {

  private apiUrl = 'http://ec2-13-57-233-1.us-west-1.compute.amazonaws.com:5000/api';

  constructor(private http: HttpClient) { }

  // Function to get all StudySpots with reviews
  getStudyspotsWithReviews() {
    return this.http.get(`${this.apiUrl}/studyspots/reviews`);
  }

  // Function to get a StudySpot by name with reviews
  getStudyspotByNameWithReviews(name: string) {
    return this.http.get(`${this.apiUrl}/studyspots/reviews`, { params: { 'name':name } });
  }

  getAllStudyspots() {
    return this.http.get(`${this.apiUrl}/studyspots`);
  }
}
