<<<<<<< HEAD
import { ProductOrder } from "../../../api/entity/productOrder.entity";

export interface iOrder {
    id:number;
    status: string;
    totalPrice: number;
    storePickup: boolean;
    address: string;
    name: string;
    products: ProductOrder[];
=======
import { iProductOrder } from './productOrder.interface';

export interface iOrder {
    productOrders: iProductOrder[];
    totalPrice: number;
    storePickup: boolean;
    name: string;
    address: string;
    creditCard: string;
>>>>>>> 6f35ddb712c38f8c7c4dc2f989d94622b53f80cd
}