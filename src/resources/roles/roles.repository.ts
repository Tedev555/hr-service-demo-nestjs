import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
}
