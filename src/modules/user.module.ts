import { Module } from '@nestjs/common';
import { UserService } from '../resources/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/users/user.entity';
import { UserRepository } from '../resources/users/user.repository';
import { UserController } from '../resources/users/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
})
export class UserModule {}
