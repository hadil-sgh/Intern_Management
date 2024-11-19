import { Component } from '@angular/core';
import { UserservicesService } from '../services/userservices.service'; 
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    userName: '',
    password: ''
  };

  constructor(private userService: UserservicesService, private router: Router) {}
  onLogin() {
    this.userService.loginUser(this.credentials).subscribe(
      response => {
        console.log('Login response:', response); 
        const { token } = response;
        if (token) {
          try {
            const decodedToken: any = jwt_decode(token);
            console.log('Decoded token:', decodedToken);
  
            localStorage.setItem('token', token);
            localStorage.setItem('role', decodedToken.role);
            console.log('Stored token:', localStorage.getItem('token'));
            console.log('Stored role:', localStorage.getItem('role'));
            
            if (decodedToken.role === 'ADMIN') {
              console.log('Redirecting to /admin/contract');
              this.router.navigate(['/admin/contract']).catch(err => {
                console.error('Redirection error:', err);
              });
            }
            if (decodedToken.role === 'USER') {
              console.log('Redirecting to /student/home');
              this.router.navigate(['/student/home']).catch(err => {
                console.error('Redirection error:', err);
              });
            }
             else {
              console.error('Unexpected role:', decodedToken.role);
            }
          } catch (decodeError) {
            console.error('Token decoding failed:', decodeError);
          }
        } else {
          console.error('Token not found in response');
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
  
  
  
}