import { iProductOrder } from './productOrder.interface';

export interface iOrder {
    id: number;
    productOrders: iProductOrder[];
    totalPrice: number;
    storePickup: boolean;
    name: string;
    address: string;
    creditCard: string;
    status: string;
}