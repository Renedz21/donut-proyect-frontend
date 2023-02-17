import { Component, OnInit } from '@angular/core';
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

  products: Products[] = [];

  totalAmount: number = 0;

  result: any;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.products;
        this.result = res.cart.products.forEach((product: any) => {
          console.log(product);
          this.productService.getOneProduct(product.productId).subscribe({
            next: (res) => {
              console.log(res);
              this.totalAmount == res.price;

            }
          })


        });

        console.log(this.result);

      }
    });


  }

  removeProduct(id: string) {
    this.cartService.removeProduct(id).subscribe({
      next: (res) => {
        this.getCart();
      }
    });
  }


}
