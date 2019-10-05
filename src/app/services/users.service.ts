import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../profile/model/user';
import { UpdateFormInfo } from '../profile/model/updateFormInfo';
import { ResponseMessageWithUser, ResponseMessage } from './response.message';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:8080/users/';
  header: HttpHeaders;
  
  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<ResponseMessageWithUser> {
    return this.http.get<ResponseMessageWithUser>(this.url + id);
  }

  updateUserById(id: number, info: UpdateFormInfo): Observable<ResponseMessageWithUser> {
    return this.http.patch<ResponseMessageWithUser>(this.url + id, info);
  } 

  addVideoToFavorites(id: number, video: Video): Observable<ResponseMessageWithUser> {
    return this.http.post<ResponseMessageWithUser>(this.url + id, video);
  }

  deleteProfile(id: number) {
    return this.http.delete(this.url + id);
  }

  removeVideo(id: number, videoId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(this.url + id + '/video/' + videoId);
  }
}