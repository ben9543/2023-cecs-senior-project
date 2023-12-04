import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  apiUrl = API_URL;
  constructor(private http: HttpClient) {}

  async uploadFileToS3(formData: FormData): Promise<string> {
    console.log(formData.get('file'));
    try {
      const response: any = await this.http.post<any>(
        `${this.apiUrl}/requests/upload_image`,
        formData
      ).toPromise();
      return response.fileUrl; // Assuming the response contains the file URL
    } catch (error) {
      throw new Error('Failed to upload file to S3');
    }
  }
}
