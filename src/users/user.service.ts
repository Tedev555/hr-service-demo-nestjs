import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';

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
    return this.userRepository.save(user);
  }

  findAllUsers(): any {
    return this.userRepository.find();
  }
}
