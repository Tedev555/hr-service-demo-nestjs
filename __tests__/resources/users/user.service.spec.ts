import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/resources/users/user.service';
import { UserRepository } from '../../../src/resources/users/user.repository';
import { DataSource, DeleteResult } from 'typeorm';
import { User } from '../../../src/resources/users/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UserService>(UserService);
  });

  it('User service should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('User repository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const createUserSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);
    // Called implented code
    const createdUser = await userService.create(user);

    // Expect the results
    expect(createdUser).toStrictEqual(user);
    expect(createUserSpy).toBeCalledWith(user);
  });

  it('should find a user by id', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    const findSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(async () => user);

    const result = await userService.findById(user.userId);
    expect(result).toEqual(user);
    expect(findSpy).toBeCalledWith({ where: { userId: user.userId } });
  });

  it('should find all users', async () => {
    const users = [
      {
        userId: 1,
        username: 'John Doe',
        email: '',
        password: '',
      },
      {
        userId: 2,
        username: 'Jane Doe',
        email: '',
        password: '',
      },
    ] as User[];

    const findSpy = jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async () => users);

    const result = await userService.findAllUsers();
    expect(result).toEqual(users);
    expect(findSpy);
  });

  it('should update a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    const updateSpy = jest
      .spyOn(userRepository, 'save')
      .mockImplementation(async () => user);
    const result = await userService.update(user);
    expect(result).toEqual(user);
    expect(updateSpy).toBeCalledWith(user);
  });

  it('should delete a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    const deleteSpy = jest
      .spyOn(userRepository, 'delete')
      .mockImplementation(async () => ({ affected: 1 } as DeleteResult));
    const result = await userService.delete(user.userId);
    expect(result.affected).toEqual(1);
    expect(deleteSpy).toBeCalledWith(user.userId);
  });
});
