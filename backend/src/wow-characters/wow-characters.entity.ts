import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class WowCharacter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blizardCharacterId: number;

  @Column()
  realm: string;

  @Column()
  name: string;

  @Column({nullable:true})
  guildRank: number;

  @Column()
  raceId: number;

  @Column()
  level: number;

  @Column()
  gender: string;

  @Column()
  guild: string;

  @Column()
  achievement_points: number;

  @Column({ type: 'timestamp'})
  lastLogin: Date;

  @Column()
  itemLevelEquipped: number;

  @Column()
  faction: string;

  @Column()
  classId: number;

  @Column()
  specId: number;

  @Column()
  mythicPlusRating: number;

  @ManyToOne(() => User, (user) => user.wowCharacters, { nullable: true })
  user: User
}