import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from './userRoles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({default:UserRoles.User})
  role: UserRoles;

  @Column({ nullable: true })
  currentHashedRefreshToken:string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  lastLogin: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created: Date;

  @Column({ default: true })
  isActive: boolean;
}