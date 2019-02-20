import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id!: number;

}