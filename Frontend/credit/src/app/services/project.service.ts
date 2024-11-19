import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `http://localhost:3030/projects`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  allocateProjectToOffer(offreId: number, projectId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${projectId}/allocate-to-offer/${offreId}`, {});
  }
}