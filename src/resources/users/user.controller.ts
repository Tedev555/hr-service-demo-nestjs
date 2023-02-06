import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(user: User) {
    return this.userService.create(user);
  }

  findById(userId: number) {
    return this.userService.findById(userId);
  }

  findAll() {
    return this.userService.findAllUsers();
  }

  update(user: User) {
    return this.userService.update(user);
  }

  async delete(user: User): Promise<boolean> {
    const result = await this.userService.delete(user.userId);
    return result.affected > 0;
  }
}
