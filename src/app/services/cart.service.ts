import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCart } from 'src/app/models/request/transport.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addToCart(item: ItemCart): Observable<any> {
    const userId = this.authService.getSession()?.user?._id;
    return this.http.post<any>(`${environment.apiUrl}/cart/${userId}`, item);
  }

  getCart(): Observable<any> {
    const userId = this.authService.getSession()?.user?._id;
    return this.http.get<any>(`${environment.apiUrl}/cart/${userId}`);
  }

  removeProduct(productId: string): Observable<any> {
    const userId = this.authService.getSession()?.user?._id;

    return this.http.delete<any>(`${environment.apiUrl}/cart/${userId}/${productId}`);
  }

}
