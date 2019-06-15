import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/auth/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService }  from './services/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SearchVids';
  
  private roles: string[];
  private authority: string;
  message = false;

  constructor(private authService: AuthService, private token: TokenStorageService, private flashMessages: FlashMessagesService, private router: Router) {}

  ngOnInit() {
    this.checkIfAuthenticated();
  }

  onClick() {
    this.token.signOut();
    this.router.navigate(['home']);
  }

  flashMessage(str: string, cssClass: string, timeout: number) {
    this.message = true;
    this.flashMessages.show(str, { cssClass: cssClass, timeout: timeout });

    setTimeout(() => this.message = false, 3000);
  }

  checkIfAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_USER') {
          this.authority = 'user'
          return true;
        }
      });
    }
  }
}