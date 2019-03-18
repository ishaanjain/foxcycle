import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Double } from "typeorm";
import { ProductOrder } from "./productOrder.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public status!: string;

  @OneToMany(type => ProductOrder, productOrder => productOrder.order)
  public productOrders!: ProductOrder[];

  @Column()
  public totalPrice!: number;

  @Column()
  public storePickup!: boolean;

  @Column()
  public name!: string;

  @Column()
  public address!: string;

  @Column()
  public creditCard!: string;

  @ManyToOne(type => User, user => user.orders)
  public user!: User;
}
