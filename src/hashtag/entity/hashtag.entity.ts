import { User } from '../../users/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entity/book.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToMany(() => Book, book => book.hashtag)
  @JoinTable({
    name: 'hashtag_book',
    joinColumn: { name: 'hashtagId' },
    inverseJoinColumn: { name: 'bookId' },
  })
  books: Book[];

  @ManyToMany(() => User, user => user.hashtag)
  @JoinTable({
    name: 'hashtag_user',
    joinColumn: { name: 'hashtagId' },
    inverseJoinColumn: { name: 'userId' },
  })
  users: User[];
}
