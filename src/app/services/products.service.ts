import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Products } from '../models/product.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products`);
  }

  getOneProduct(id: string): Observable<Products> {
    return this.http.get<Products>(`${environment.apiUrl}/products/${id}`);
  }

}
