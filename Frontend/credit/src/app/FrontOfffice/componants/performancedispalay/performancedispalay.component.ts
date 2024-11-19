import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PerformanceServiceService   } from 'src/app/services/performance-service.service';
import jwt_decode from 'jwt-decode';
import { Performance } from 'src/app/models/Performance';



@Component({
  selector: 'app-performancedispalay',
  templateUrl: './performancedispalay.component.html',
  styleUrls: ['./performancedispalay.component.css']
})
export class PerformancedispalayComponent implements OnInit {
  performanceList: Performance[] = [];
  itemsPerPage: number = 6;
  p: number = 1;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private performanceService: PerformanceServiceService
  ) {}

  ngOnInit(): void {
    this.getUserIdFromToken(); 
    this.loadUserPerformances();
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
  getStars(grade: number): string[] {
    console.log('Calculating stars for grade:', grade);
    const stars = [];
    const fullStars = Math.floor(grade);
    const halfStar = grade % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push('checked');
    }
    if (halfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push(''); 
    }
    console.log('Stars array:', stars);
    return stars;
  }
  loadUserPerformances(): void {
    if (this.userId) {
      this.performanceService.getPerformancesByUserId(this.userId).subscribe(
        (data: Performance[]) => {
          console.log('Performance list data:', data);
          this.performanceList = data;
        },
        (        error: any) => {
          console.error('Error loading performance list:', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }

  private isTokenValid(expiry: number): boolean {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return now < expiry;
  }
}
