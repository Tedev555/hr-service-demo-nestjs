import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '../../src/entities/user.entity';
import { UserRepository } from '../../src/repositories/user.repository';
import { User } from 'src/entities/user.entity';

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

  //   describe('findAllUsers', () => {
  //     it('should return an array of users', async () => {
  //       const users = [
  //         {
  //           userId: 1,
  //           username: 'test1',
  //         },
  //         {
  //           userId: 2,
  //           username: 'test2',
  //         },
  //       ] as User[];
  //       //       userRepository.findAll.mockReturnValue(users);

  //       expect(userRepository.findAll()).toBe(users);
  //     });
  //   });

  //   describe('findById', () => {
  //     it('should return a user', async () => {
  //       const user = {
  //         id: 1,
  //         name: 'John Doe',
  //       };
  //       userRepository.findById.mockReturnValue(user);

  //       expect(userRepository.findById(1)).toBe(user);
  //     });
  //   });

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
