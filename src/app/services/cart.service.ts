import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCart } from 'src/app/models/request/transport.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  cart$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  addToCart(item: any): void {
    console.log(item);
    const currentCart = this.cartSubject.value;

    const itemIndex = currentCart.findIndex((cartItem: any) => cartItem.id === item.id);

    console.log(itemIndex);

    if (itemIndex >= 0) {
      currentCart[itemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    console.log(currentCart);

    localStorage.setItem('cart', JSON.stringify(currentCart));

    this.cartSubject.next(currentCart);
    // this.updateQuantityInLocalStorage(item.id, item.quantity);

    // const userId = this.authService.getSession()?.user?.id;
    // this.http.post<any>(`${environment.apiUrl}/cart/${userId}/items`, item);
  }

  removeFromCart(id: string): void {
    const currentCart = this.cartSubject.value;
    const itemIndex = currentCart.findIndex((cartItem: any) => cartItem.id === id);

    if (itemIndex >= 0) {
      currentCart.splice(itemIndex, 1);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));

    this.cartSubject.next(currentCart);
  }

  getCartByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cart/${userId}`);
  }

  saveCart(cart: any): Observable<any> {
    const userId = this.authService.getSession()?.user?.id;
    return this.http.post<any>(`${environment.apiUrl}/cart/${userId}`, cart);
  }

  clearLocalStorage() {
    localStorage.removeItem('cart');
    this.cart$.subscribe((res) => {
      res = [];
    });
  }

}
