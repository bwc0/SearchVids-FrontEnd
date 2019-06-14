import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/auth/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SearchVids';
  
  private roles: string[];
  private authority: string;

  constructor(private token: TokenStorageService, private router: Router) {}

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_USER') {
          this.authority = 'user'
          return true;
        }
      });
    }
  }

  onClick() {
    this.token.signOut();
    this.router.navigate(['home']);
  }

}
