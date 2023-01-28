import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products/products.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProductDetailComponent,
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
