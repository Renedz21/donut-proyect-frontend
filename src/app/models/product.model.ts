import { Category } from "./category.class";

export class Products {
    _id: string = '';
    name: string = '';
    price: number = 0;
    description: string = '';
    image: string = '';
    category: Category = new Category();
    isAvailable: string = '';
    deleted: boolean = false;
}