import { Category } from "./category.interface";

export interface Products {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
    isAvailable: string;
    deleted: boolean;
}