import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
