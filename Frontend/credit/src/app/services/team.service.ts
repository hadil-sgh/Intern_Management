import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:3030/team';  

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${team.id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3030/users');
  }
  
  addMemberToTeam(teamId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${teamId}/addMember`, { userId });
  }
}