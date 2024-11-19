import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserservicesService } from 'src/app/services/userservices.service';
import jwt_decode from 'jwt-decode'; // Import the jwt-decode library

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  userId!: number;

  constructor(private userservice: UserservicesService) {}

  ngOnInit(): void {
    this.getUserIdFromToken();
    if (this.userId) {
      this.getUserDetails(this.userId);
    } else {
      console.error('User ID not found or invalid token');
    }
  }

  private isTokenValid(expiry: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now < expiry;
  }

  getUserIdFromToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        console.log('Decoded Token:', decodedToken);
        this.userId = decodedToken.userId || decodedToken.id || decodedToken.sub;
        console.log('Decoded userId:', this.userId);

        const tokenExpiry = decodedToken.exp;
        if (tokenExpiry && !this.isTokenValid(tokenExpiry)) {
          console.error('Token has expired');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }

  getUserDetails(userId: number): void {
    this.userservice.getUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log('User Details:', user);
      },
      (error) => {
        console.log('Error fetching user details:', error);
      }
    );
  }
}
