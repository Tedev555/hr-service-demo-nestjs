import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '../../src/entities/user.entity';
import { UserRepository } from '../../src/resources/users/user.repository';
import { User } from '../../src/resources/users/user.entity';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = {
        userId: 1,
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
      } as User;
      const createUserSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(user);
      const result = await userRepository.save(user);
      expect(result).toEqual(user);
      expect(createUserSpy).toHaveBeenCalled();
      expect(createUserSpy).toHaveBeenCalledWith(user);
    });
  });
});
