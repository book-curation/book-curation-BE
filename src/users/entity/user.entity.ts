import { Phrase } from '../../phrase/entity/phrase.entity';
import { Curation } from '../../curations/entity/curation.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hashtag } from '../../hashtag/entity/hashtag.entity';

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  status: AccountStatus;

  @CreateDateColumn()
  registerAt: Date;

  @OneToMany(() => Phrase, phrase => phrase.user)
  phrases: Phrase[];

  @OneToMany(() => Curation, curation => curation.user)
  curations: Curation[];

  @ManyToMany(() => Hashtag, hashtag => hashtag.users)
  hashtag: Hashtag[];
}
