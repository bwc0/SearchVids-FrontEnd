import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { TokenStorageService } from '../services/auth/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UpdateFormInfo } from './model/updateFormInfo';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  user: User;
  id: any;
  errorMessage = '';
  private info: UpdateFormInfo;

  constructor(private token: TokenStorageService, private router: Router,
    private userData: UsersService, private app: AppComponent) {}

  ngOnInit() {
    this.id = this.token.getId();
    this.userData.getUserById(this.id).subscribe(data => this.user = data.user);
  }

  onSubmit() {
    this.info = new UpdateFormInfo (
      this.form.username,
      this.form.password,
    );

    this.userData.updateUserById(this.id, this.info).subscribe(data => {
      if (data.status === 'OK') {
        this.token.signOut();
        this.app.flashMessage('Please login with new username or password to confirm update', 'alert-success', 3000);
        this.router.navigate(['login']);
      } else {
        this.app.flashMessage(data.message, 'alert-danger', 3000);
      }
    });
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['home']);
  }

  deactivate() {
    this.userData.deleteProfile(this.id).subscribe(() => {
      this.app.flashMessage('Account deleted', 'alert-success', 3000);
      this.token.signOut();
      this.router.navigate(['home']);
      
      setTimeout(() => {
        window.location.reload();
      }, .1);
    });
  }

  removeVideo(videoId: string) {
    this.userData.removeVideo(this.id, videoId).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, .1);

    }, error => {
        this.errorMessage = error.error.message;
        this.app.flashMessage(this.errorMessage, 'alert-danger', 3000);
    });     
  }
}