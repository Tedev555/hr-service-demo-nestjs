import { Injectable } from '@nestjs/common';

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
