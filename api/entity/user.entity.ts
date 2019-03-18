import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Index({ unique: true })
  public emailAddress!: string;

  @Column()
  public password!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public isAdmin!: boolean;

  @Column({default: null})
  public profileUrl!: string;

  @OneToMany(type => Order, Order => Order.user)
  public orders!: Order[];
}
