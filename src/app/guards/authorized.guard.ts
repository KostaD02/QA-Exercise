import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const path = sessionStorage.getItem('token');
    if (path) {
      return true;
    } else {
      return this.router.parseUrl('/sign-in');
    }
  }
}
