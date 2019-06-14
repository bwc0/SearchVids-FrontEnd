import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../services/auth/login-info';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  loginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.authenticate(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveId(data.id);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.loginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
      
        this.reloadPage();
      },

      error => {
        this.errorMessage = error.error.message;
        alert('Username or password not recognized. Please try again: ' + this.errorMessage);
        this.loginFailed = true;
      }
    );
  }

  reloadPage() {
    this.router.navigate(['home']);
    
    setTimeout(() => {
      window.location.reload();
      
    }, .1)
  }
}
