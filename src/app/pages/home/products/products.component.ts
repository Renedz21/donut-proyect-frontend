import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

import { Products } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/models/request/transport.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Products[] = [];

  cart: any;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    })
  }

  addToCart(item: any) {
    // const itemProduct: ItemCart = {
    //   productId: item._id,
    //   quantity: 1
    // }
    // this.cartService.addToCart(itemProduct).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.cart = data.message;
    //   }
    // })
  }

}
