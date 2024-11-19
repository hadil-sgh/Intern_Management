import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private apiUrl = `http://localhost:3030/task`; 

  constructor(private http: HttpClient) {}

  getTasksByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
