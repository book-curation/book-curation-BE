import { User } from '../../users/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entity/book.entity';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Book, book => book.phrases)
  book: Book;

  @ManyToOne(() => User, user => user.phrases)
  user: User;
}
