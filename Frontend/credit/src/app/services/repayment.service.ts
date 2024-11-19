import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepaymentService {
  private apiUrl = 'http://localhost:3000/repaymentplans'; 

  constructor(private http: HttpClient) {}

  getRepaymentPlans(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRepaymentPlanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRepaymentPlan(repaymentPlan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, repaymentPlan);
  }

  updateRepaymentPlan(id: number, repaymentPlan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, repaymentPlan);
  }

  deleteRepaymentPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
