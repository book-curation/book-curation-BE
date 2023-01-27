import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Hashtag {
  @PrimaryColumn()
  hashtagId: string;

  @Column() // need to be updated as a foreign Key for User Id
  userId: string;

  @Column()
  content: string;

  @ManyToOne(() => Book, (book) => book.ISBN)
  bookId: Book;
}
