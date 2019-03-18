import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public start!: number;

  @Column()
  public end!: number;

  @Column()
  public startam!: string;

  @Column()
  public endam!: string;

  @Column()
  public name!: string;
}