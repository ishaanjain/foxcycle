import { iProduct } from './product.interface';

export interface iProductOrder {
    productId: number;
    productCount: number;
    name: string;
    price: number;
    image: string;
}