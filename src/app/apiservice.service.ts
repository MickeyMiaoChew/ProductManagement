import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'https://localhost:7014/api/';
  constructor(private http: HttpClient) { }

   //Product
   getProductList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'product');
  }

  addProduct(prd: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'product', prd, httpOptions);
  }

  updateProduct(prd: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'product', prd, httpOptions);
  }

  deleteProduct(prdId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'product/' + prdId, httpOptions);
  }
  getAllDepartmentNames(prdId: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'product' +prdId);
  }
}
