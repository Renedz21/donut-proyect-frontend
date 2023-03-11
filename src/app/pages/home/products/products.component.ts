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

  // products: Products[] = [];
  products: any[] = [];
  isLoading: boolean = true;

  quantity: number = 0;

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
        console.log(data);
        this.products = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        // data.forEach((item: any) => {
        //   this.images = item.images;
        // })
      }
    })
  }

  addToCart(item: any) {
    const itemProduct: ItemCart = {
      quantity: 1,
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    }

    this.cartService.addToCart(itemProduct);
  }

}
