import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = 'http://localhost:8080/api/catalog/submit';
  private fetchUrl = 'http://localhost:8080/api/sync-unarchived';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const catalogId = localStorage.getItem('catalogId') || '';
    const token = localStorage.getItem('token')|| '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'CatalogId': catalogId,
        'Authorization' : token
      })
    };
  }

  submitCatalog(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      ...this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

   private getSyncHeaders(): { headers: HttpHeaders } {
    const requestId = crypto.randomUUID(); 
    const canal = 'AngularApp';
    return {
      headers: new HttpHeaders({
        'x-api-requestId': requestId,
        'x-api-canal': canal
      })
    };
  }

  fetchUnarchivedProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.fetchUrl, this.getSyncHeaders());
  }


  
}
