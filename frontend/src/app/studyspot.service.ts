import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyspotService {

  private apiUrl = API_URL;

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

  likeCard(studyspotName: string, userID: number): Observable<any> {
    const likeUrl = `${this.apiUrl}/like-card`; 
    // Include both the studyspot name and username in the request body
    const requestPayload = { studyspot_name: studyspotName, user_id: userID };
    return this.http.post(likeUrl, requestPayload);
  }

  unlikeCard(studyspotName: string, userID: number): Observable<any> {
    const unlikeUrl = `${this.apiUrl}/unlike-card`; 
    // Include both the studyspot name and username in the request body
    const requestPayload = { studyspot_name: studyspotName, user_id: userID };
    return this.http.post(unlikeUrl, requestPayload);
  }

  getLikedState(studyspotName: string, userID: number): Observable<{ liked: boolean }> {
    const likedStateUrl = `${this.apiUrl}/get-liked-state`;
    // Include both the studyspot name and username in the request parameters
    return this.http.get<{ liked: boolean }>(likedStateUrl, {
      params: { studyspot_name: studyspotName, user_id: userID }
    });
  }

  getAllLikedStudySpotsByUser(userID: number): Observable<any> {
    const url = `${this.apiUrl}/users/favorites/get-favorites-list/${userID}`;
    return this.http.get(url);
  }
}
