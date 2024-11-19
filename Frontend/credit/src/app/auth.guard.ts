import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(): boolean {
      const role = localStorage.getItem('role');
      console.log('AuthGuard checking role:', role); 
      if (role === 'ADMIN') {
        console.log('AuthGuard');
        return true;
      } else {
        console.log('not');

        return false;
      }
    }
  }
  
  