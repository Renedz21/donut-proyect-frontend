import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Products } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any;

  totalAmount: any;

  result: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getCart();
    // this.getTotalAmount();
  }

  getCart() {
    const item = localStorage.getItem('cart');
    this.products = JSON.parse(item ? item : '[]');
    this.products.forEach((item: any) => {
      this.totalAmount = item.price * item.quantity;
    })

    this.totalAmount = this.products.reduce((acc: any, item: any) => {
      return acc + item.price * item.quantity;
    }, 0)

  }

  getTotalAmount() {
    this.products.forEach((item: any) => {
      this.totalAmount = item.price * item.quantity;
    })
  }

  saveCart() {
    this.spinner.show();
    this.cartService.saveCart(this.products).subscribe({
      next: (res) => {
        this.cartService.clearLocalStorage();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }


}
