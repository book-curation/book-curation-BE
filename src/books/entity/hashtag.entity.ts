import { User } from "src/users/entity/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Hashtag {
  @PrimaryColumn()
  hashtagId: string;

  @Column()
  userId: string;

  @Column()
  content: string;

  @ManyToMany(() => Book)
  @JoinTable({
    name: "hashtag_book",
    joinColumn: { name: "hashtagId" },
    inverseJoinColumn: { name: "bookId" },
  })
  books: Book[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "hashtag_user",
    joinColumn: { name: "hashtagId" },
    inverseJoinColumn: { name: "userId" },
  })
  users: User[];
}
