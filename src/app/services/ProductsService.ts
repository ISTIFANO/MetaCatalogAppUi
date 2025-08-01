import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import type { Observable } from "rxjs"
import { catchError } from "rxjs/operators"
import { throwError } from "rxjs"
import { HttpParams } from "@angular/common/http"
import {ProductDTO} from "../shared/models/ProductDTO";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private apiUrl = "https://bb53e6542e26.ngrok-free.app/api/products"
  private statsUrl = "https://bb53e6542e26.ngrok-free.app/api/products/stats"

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "true",
      }),
    }
  }

  fetchAllProducts(website: string, filters: any): Observable<any> {
    let params = new HttpParams().set("website", website)
    for (const key in filters) {
      const val = filters[key]
      if (val !== undefined && val !== null && val !== "") {
        params = params.set(key, val)
      }
    }
    return this.http.get<any>(this.apiUrl, {
      headers: this.getHeaders().headers,
      params,
    })
  }

  fetchProductStats(website: string): Observable<any> {
    return this.http.get<any>(`${this.statsUrl}?website=${website}`, { headers: this.getHeaders().headers })
  }

 
  saveProduct(product: ProductDTO): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/save`, product, this.getHeaders()).pipe(
      catchError((error) => {
        console.error("Error saving product:", error)
        return throwError(() => new Error("Failed to save product"))
      }),
    )
  }
}
