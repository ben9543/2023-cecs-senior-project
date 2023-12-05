import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  apiUrl = API_URL;
  constructor(private http: HttpClient) {}

  async uploadFileToS3(formData: FormData, newName: string): Promise<string> {
    const file: File | null = formData.get('file') as File;
  
    if (file) {
      // Create a new File object with the desired name
      const renamedFile = new File([file], newName, { type: file.type });
  
      // Replace the existing file in the FormData with the renamed file
      formData.set('file', renamedFile, newName);
      
      try {
        const response: any = await this.http.post<any>(
          `${this.apiUrl}/requests/upload_image`,
          formData
        ).toPromise();
        return response.fileUrl; // Assuming the response contains the file URL
      } catch (error) {
        throw new Error('Failed to upload file to S3');
      }
    } else {
      throw new Error('No file found in FormData');
    }
  }
}
