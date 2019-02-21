import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public monstart!: Time;

  @Column()
  public monend!: Time;

  @Column()
  public tuestart!: Time;

  @Column()
  public tuesend!: Time;

  @Column()
  public wedstart!: Time;

  @Column()
  public wedend!: Time;
  
  @Column()
  public thursstart!: Time;

  @Column()
  public thursend!: Time;

  @Column()
  public fristart!: Time;

  @Column()
  public friend!: Time;

  @Column()
  public satstart!: Time;

  @Column()
  public satend!: Time;

  @Column()
  public sunstart!: Time;

  @Column()
  public sunend!: Time;

  @Column()
  public description!: string; 
}