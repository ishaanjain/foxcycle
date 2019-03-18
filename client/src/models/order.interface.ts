import { iProductOrder } from './productOrder.interface';

export interface iOrder {
    productOrders: iProductOrder[];
    totalPrice: number;
    storePickup: boolean;
    name: string;
    address: string;
    creditCard: string;
}