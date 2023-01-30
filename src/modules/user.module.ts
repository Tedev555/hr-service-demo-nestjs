import { Module } from '@nestjs/common';
import { UserService } from '../resources/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
