import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Result } from '../home/model/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  readonly url = 'https://www.googleapis.com/youtube/v3/search';
  readonly key = 'GOOGLE API KEY'

  params: HttpParams;
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  search(query: string): Observable<Result> {
    this.params = new HttpParams()
      .set('part', 'snippet, id')
      .set('q', query)
      .set('type', 'video')
      .set('key', this.key);

    return this.http.get<Result>(this.url, { params: this.params });
  }

  getNextAndPreviousPages(query: string, token: string): Observable<Result> {
    this.params = new HttpParams()
      .set('part', 'snippet, id')
      .set('q', query)
      .set('pageToken', token)
      .set('type', 'video')
      .set('key', this.key);

    return this.http.get<Result>(this.url, { params: this.params },);
  }
}
