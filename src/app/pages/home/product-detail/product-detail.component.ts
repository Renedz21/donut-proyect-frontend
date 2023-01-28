import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  _id: string = '';

  oneProduct: Products | undefined;

  constructor(
    private productService: ProductsService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this._id = this.activatedRouter.snapshot.params['id'];

    if (this._id) {
      this.getOneProduct(this._id);
    } else {
      console.log('No hay id');
    }
  }

  getOneProduct(id: string): void {
    this.productService.getOneProduct(id).subscribe({
      next: (data) => {
        console.log(data);
        this.oneProduct = data;

      }
    })
  }


}
