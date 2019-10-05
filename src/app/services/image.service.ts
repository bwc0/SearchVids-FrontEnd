import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileReponse } from '../profile/model/uploadedFileResponse';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  uploadImage(id: number, file: File): Observable<UploadFileReponse>{
    const formData: FormData = new FormData();

    formData.append('imageFile', file);

    return this.http.post<UploadFileReponse>(this.url + id + "/image", formData)
  }
}
