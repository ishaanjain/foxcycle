import { iProduct } from './product.interface';

export interface iProductOrder {
    id: number,
    name: string,
    price: number,
    image: string,
    delivery: boolean,
    quantity: number,
    description: string
}