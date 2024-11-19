import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerformanceServiceService {
  private apiUrl = `http://localhost:3030/performance`; 

  constructor(private http: HttpClient) {}

  getPerformancesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getAllPerformances(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPerformanceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPerformance(performance: any): Observable<any> {
    return this.http.post(this.apiUrl, performance);
  }

  updatePerformance(id: number, performance: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, performance);
  }

  deletePerformance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
