import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AccountStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  status: AccountStatus;

  @Column()
  registerDate: Date;
}
