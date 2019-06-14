import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { TokenStorageService } from '../services/auth/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UpdateFormInfo } from './model/updateFormInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  user: User;
  id: any;
  private info: UpdateFormInfo;

  constructor(private token: TokenStorageService, private router: Router,
    private userData: UsersService) {}

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
        this.loginAfterUpdate();
      } else {
        alert(data.message);
      }
    });
  }

  loginAfterUpdate() {
    this.token.signOut();
    this.router.navigate(['login']);

    setTimeout(() => {
      alert('Please login with new username or password to confirm update');
      window.location.reload();
    }, .1);
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['home']);

    setTimeout(() => {
      window.location.reload();
    }, .1);
  }
}