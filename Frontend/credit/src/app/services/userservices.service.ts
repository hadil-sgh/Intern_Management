import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  private apiUrl = 'http://localhost:3030/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }


}
