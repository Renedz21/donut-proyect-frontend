import { Cart } from "./cart.class";
import { Products } from "./product.model";

export class CartItem {
    id: number = 0;
    productId: number = 0;
    quantity: number = 0;
    cart: Cart = new Cart();
    product: Products = new Products();
}