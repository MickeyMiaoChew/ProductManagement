import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiResponse, Product } from './models/product';
import apiurl from '../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  //readonly apiUrl = 'https://localhost:7014/api/';
  constructor(private http: HttpClient) { }

   //Product
   getProductList(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(apiurl.apiServer.url + 'product');
  }

  addProduct(prd: Product): Observable<ApiResponse<Product[]>> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<ApiResponse<Product[]>>(apiurl.apiServer.url + 'product', prd, httpOptions);
  }

  updateProduct(prd: Product): Observable<ApiResponse<Product[]>> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<ApiResponse<Product[]>>(apiurl.apiServer.url + 'product', prd, httpOptions);
  }

  deleteProduct(prdId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(apiurl.apiServer.url + 'product/' + prdId, httpOptions);
  }

}
