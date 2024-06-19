import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Issue {
  title: string;
  description: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private readonly httpClient: HttpClient) {}
  baseUrl = 'http://localhost:3000';

  getAll(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.baseUrl);
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.httpClient.post<Issue>(this.baseUrl, { issue });
  }

  getIssueById(id: number): Observable<Issue> {
    return this.httpClient.get<Issue>(`${this.baseUrl}/${id}`);
  }

  updateIssue(id: number, issue: Partial<Issue>): Observable<Issue> {
    return this.httpClient.put<Issue>(`${this.baseUrl}/${id}`, { issue });
  }

  deleteIssue(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.baseUrl}/${id}`);
  }
}
