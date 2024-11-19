import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credit } from '../models/Credit';

@Injectable({
  providedIn: 'root'
})
export class CreditserviceService {

  private apiUrl = 'http://localhost:3030/credits';  

  constructor(private http: HttpClient) { }

  createCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.apiUrl, credit);
  }

  getAllCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.apiUrl);
  }

  getCreditById(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.apiUrl}/${id}`);
  }

  updateCredit(id: number, credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/${id}`, credit);
  }

  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteMultipleCredits(creditIds: number[]): Observable<void> {
    return this.http.request<void>('DELETE', this.apiUrl, {
      body: { creditIds },
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getCreditPercentagesByType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/percentages`);
  }

  updateCreditStatusWithEmail(id: number, credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/status/${id}`, credit);
  }
}
