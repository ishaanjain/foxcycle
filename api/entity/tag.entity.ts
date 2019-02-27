import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @ManyToMany(type => Product, product => product.tags) 
    public products!: Product[];

}