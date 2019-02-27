import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public monstart!: Date;

  @Column()
  public monend!: Date;

  @Column()
  public tuestart!: Date;

  @Column()
  public tuesend!: Date;

  @Column()
  public wedstart!: Date;

  @Column()
  public wedend!: Date;
  
  @Column()
  public thursstart!: Date;

  @Column()
  public thursend!: Date;

  @Column()
  public fristart!: Date;

  @Column()
  public friend!: Date;

  @Column()
  public satstart!: Date;

  @Column()
  public satend!: Date;

  @Column()
  public sunstart!: Date;

  @Column()
  public sunend!: Date;

  @Column()
  public description!: string; 
}