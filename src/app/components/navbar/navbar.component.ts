import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;

  @ViewChild('buttonCollapse') buttonCollapse!: ElementRef;
  @ViewChild('collapseMenu') collapseMenu!: ElementRef;

  isCollapsed: boolean = true;

  cartItems: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private rendered: Renderer2
  ) { }

  ngOnInit() {
    this.authService.getSession()?.user?.isAdmin ? this.isAdmin = true : this.isAdmin = false;
    // this.getItemsCart()
  }

  logout() {
    this.authService.logout();
  }

  showMenu() {
    const button = this.buttonCollapse.nativeElement;
    const menu = this.collapseMenu.nativeElement;

    if (button.classList.contains('button') && this.isCollapsed) {
      this.rendered.removeClass(menu, 'hidden');
      this.rendered.addClass(menu, 'block');
    } else {
      this.rendered.removeClass(menu, 'block');
      this.rendered.addClass(menu, 'hidden');
    }

    this.isCollapsed = !this.isCollapsed;

  }

  // getItemsCart() {
  //   this.cartService.getCart().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res) {
  //         // this.cartItems = res.products?.length;
  //       } else {
  //         console.log('No hay productos en el carrito');
  //       }
  //       // update in real time the number of items in the cart and assing it to the variable cartItems
  //     }
  //   });
  // }

}
