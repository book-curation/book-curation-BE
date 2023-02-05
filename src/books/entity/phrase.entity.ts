import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Phrase {
  @PrimaryColumn()
  phraseId: string;

  @Column()
  content: string;

  @OneToOne(() => Book, (book) => book.phrase)
  @JoinColumn()
  book: Book;

  @OneToOne(() => User, (user) => user.phrase)
  @JoinColumn()
  user: User;
}
