import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: any) {}

  findAllUsers(): any[] {
    return this.userRepository.findAll();
  }

  findById(userId: number) {
    return this.userRepository.findById(userId);
  }

  create(user: any) {
    return this.userRepository.create(user);
  }
}
