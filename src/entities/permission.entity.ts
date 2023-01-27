import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permissionId: number;

  @Column({ unique: true })
  permissionName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Role, (role) => role.permissions)
  roles: Role[];
}
