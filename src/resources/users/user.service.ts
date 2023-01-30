import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { UpdateCatDto } from 'src/dtos/update-cat.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // findAllUsers(): any[] {
  //   return this.userRepository.findAll();
  // }

  // findById(userId: number) {
  //   return this.userRepository.findById(userId);
  // }

  async create(user: User) {
    return user;
    // return this.userRepository.create(user);
  }

  findAllUsers(): any {
    // return this.userRepository.find();
  }

  async update(updateUser: User): Promise<any> {
    // const result = await this.userRepository.save(updateUser);
    // return result;
  }

  // async findById(username: string) {
  //   return this.userRepository.findOne({ username });
  // }
}
