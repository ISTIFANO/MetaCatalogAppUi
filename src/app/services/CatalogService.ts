import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = 'http://localhost:8080/api/catalog/submit';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer YOUR_TOKEN'
      })
    };
  }

  submitCatalog(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload, this.getHeaders());
  }
}
