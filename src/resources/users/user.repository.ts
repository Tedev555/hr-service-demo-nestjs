import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
}
