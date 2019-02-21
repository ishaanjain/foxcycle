import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public description!: string;
    
    @Column({default: 10})
    public price!: number;
}