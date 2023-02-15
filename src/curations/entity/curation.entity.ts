import { Book } from "../../books/entity/book.entity";
import { User } from "../../users/entity/user.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class Curation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isPublic: boolean;

  @Column({ type: "timestamptz" })
  createAt: Date;

  @ManyToOne(() => User, (user) => user.curations)
  user: User;

  @ManyToMany(() => Book)
  @JoinTable({
    name: "curation_booklist",
    joinColumn: { name: "curationId" },
    inverseJoinColumn: { name: "bookId" },
  })
  books: Book[];
}
