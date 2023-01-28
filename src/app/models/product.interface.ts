import { Category } from "./category.interface";

export interface Products {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
    isAvailable: string;
    deleted: boolean;
}