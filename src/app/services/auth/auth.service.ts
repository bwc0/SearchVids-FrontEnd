import { Injectable }           from '@angular/core';
import { HttpHeaders, HttpClient }          from '@angular/common/http';
import { JwtHelperService }     from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage/token-storage.service';
import { AuthLoginInfo } from './login-info';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { SignUpInfo } from './signup-info';
import { ResponseMessage } from '../response.message';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  authenticate(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.api_url + '/signin', credentials, httpOptions);
  }

  register(credentials: SignUpInfo): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(this.api_url + '/signup', credentials, httpOptions);
  }

  isAuthenticated(): boolean {
    const token = this.token.getToken();

    return !jwtHelper.isTokenExpired(token);
  }
}
