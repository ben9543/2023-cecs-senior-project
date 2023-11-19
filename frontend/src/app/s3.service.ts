import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  constructor(private http: HttpClient) {}

  uploadFileToS3(file: File, name: string): Promise<string> {
    const formData = new FormData();
    const newName = name; // Set the file name to spot name

    formData.append('file', file, newName);

    return this.http.post<string>('endpoint here', formData)
      .toPromise()
      .then((response: any) => {
        return response.fileUrl; 
      })
      .catch((error: any) => {
        throw new Error('Failed to upload file to S3');
      });
  }
}
