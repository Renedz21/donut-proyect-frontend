import { CartItem } from "./cartItem.class";

export class Cart {
    id: number = 0;
    items: CartItem[] = [];
    total: number = 0;
}