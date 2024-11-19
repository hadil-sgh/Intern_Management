import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../models/Contract';
@Injectable({
  providedIn: 'root'
})
export class ContractserviceService {
  private apiUrl = `http://localhost:3030/contracts`;

  constructor(private http: HttpClient) { }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.apiUrl, contract);
  }

  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl);
  }

  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/${id}`);
  }

  updateContract(id: number, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${id}`, contract);
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  generateContractPdf(id: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      headers,
      responseType: 'blob'
    });
  }
}
