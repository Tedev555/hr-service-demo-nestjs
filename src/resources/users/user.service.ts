import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    return this.userRepository.save(user);
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { userId: id } });
  }

  findAllUsers(): any {
    return this.userRepository.find();
  }

  async update(updateUser: User) {
    return this.userRepository.save(updateUser);
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
