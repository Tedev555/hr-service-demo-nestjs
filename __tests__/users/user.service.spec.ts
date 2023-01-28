import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/users/user.service';
import { UserRepository } from '../../src/users/user.repository';
import { DataSource } from 'typeorm';
import { User } from '../../src/users/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    // userRepository = {
    //   findAll: jest.fn(),
    //   find: jest.fn(),
    //   findById: jest.fn(),
    //   create: jest.fn(),
    // };
    // userRepository = new UserRepository();
    userRepository = module.get<UserRepository>(UserRepository);
    userService = new UserService(userRepository);
  });

  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('UserService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userService.create should be defined', () => {
    expect(userService.create).toBeDefined();
  });

  it('should called userRepository.create with a User arg', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const createUserSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);
    await userService.create(user);

    expect(createUserSpy).toBeCalledWith(user);
  });

  it('should return a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    jest.spyOn(userRepository, 'save').mockResolvedValue(user);
    expect(await userService.create(user)).toStrictEqual(user);
  });

  it('should return an array of users', async () => {
    const result = [
      {
        userId: 1,
        username: 'John Doe',
      } as User,
      {
        userId: 2,
        username: 'Jane Doe',
      } as User,
    ];

    // Mock the userRepository.findAll() method
    const findAllSpy = jest
      .spyOn(userRepository, 'find')
      .mockResolvedValue(result);

    // Expect the result to be the same as the mock
    expect(findAllSpy).toBeCalled();
    expect(await userService.findAllUsers()).toStrictEqual(result);
  });

  // it('repository.create shoulde be called', async () => {
  //   const user = {
  //     id: 1,
  //     name: 'John Doe',
  //   };

  //   await userService.create(user);
  //   expect(userRepository.create).toBeCalledWith(user);
  // });

  // it('called userRepository.create(user) should return a user', async () => {
  //   const user = {
  //     id: 1,
  //     name: 'John Doe',
  //   };

  //   userRepository.create.mockReturnValue(user);
  //   expect(await userService.create(user)).toStrictEqual(user);
  // });

  // it('should return an array of users', async () => {
  //   const result = [
  //     {
  //       id: 1,
  //       name: 'John Doe',
  //     },
  //   ];
  //   userRepository.findAll.mockReturnValue(result);
  //   expect(await userService.findAllUsers()).toStrictEqual(result);
  // });

  // it('userRepository.findById() should be called with id', async () => {
  //   const id = 1;
  //   await userService.findById(id);
  //   expect(userRepository.findById).toBeCalledWith(id);
  // });

  // it('called userRepository.findById() should return a user', async () => {
  //   const result = {
  //     id: 1,
  //     name: 'John Doe',
  //   };

  //   userRepository.findById.mockReturnValue(result);
  //   expect(await userService.findById(result.id)).toStrictEqual(result);
  // });
});
