import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { Observable } from 'rxjs';
import { CreateRequestDTO } from '../app/DTOs/create-request.dto'

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

  add_review(user_id: number, studyspot_name: string, review_comments: string, review_rate: number): Observable<any>{
    const addReview = `${this.apiUrl}/add_review`; 
    // Include both the studyspot name and username in the request body
    const requestPayload = { user_id: user_id, studyspot_name: studyspot_name, review_comments: review_comments, review_rate: review_rate };
    return this.http.post(addReview, requestPayload);
  }

  // Function to add a unique study spot name to local storage
  addStudySpotName(name: string): void {
    const studySpots = this.getStudySpots();
    if (!studySpots.includes(name)) {
      studySpots.push(name);
      localStorage.setItem('studySpots', JSON.stringify(studySpots));
    }
  }

  // Function to retrieve the list of study spot names from local storage
  getStudySpots(): string[] {
    const studySpotsString = localStorage.getItem('studySpots');
    return studySpotsString ? JSON.parse(studySpotsString) : [];
  }

  createRequest(requestData: CreateRequestDTO): Observable<any> {
    const requestApi = `${this.apiUrl}/requests/create_request`;
    return this.http.put(requestApi, requestData);
  }
}