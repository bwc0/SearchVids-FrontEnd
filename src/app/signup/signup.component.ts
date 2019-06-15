import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../services/auth/signup-info';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: any = {};
  info: SignUpInfo;
  isSignedUp = false;
  isSignedUpFailed = false;
  message: string;
  status: string;
  errorMessage: '';

  constructor(private authService: AuthService, private router: Router, private app: AppComponent) {}

  ngOnInit() {}

  onSubmit() {

    this.info = new SignUpInfo (
      this.form.email,
      this.form.username,
      this.form.password
    );

    this.authService.register(this.info).subscribe(data => {

      if (data.status === 'OK') {
        this.isSignedUp = true;
        this.isSignedUpFailed = false;

        this.redirectToLoginScreen(data.message);

        return;
      }

      this.isSignedUp = false;
      this.isSignedUpFailed = true;

      this.app.flashMessage(data.message, 'alert-danger', 3000);
    });
  }

  redirectToLoginScreen(str: string) {
    this.app.flashMessage(str, 'alert-success', 3000);
    this.router.navigate(['login']);
  }
}
