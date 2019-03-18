import { ProductOrder } from "../../../api/entity/productOrder.entity";

export interface iOrder {
    id:number;
    status: string;
    totalPrice: number;
    storePickup: boolean;
    address: string;
    name: string;
    products: ProductOrder[];
}