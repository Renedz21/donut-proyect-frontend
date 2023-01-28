import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCart } from 'src/app/models/request/transport.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  addToCart(item: ItemCart): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cart/63d58770fd29f5f543447e14`, item);
  }

}
