import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/resources/users/user.service';
import { UserRepository } from '../../../src/resources/users/user.repository';
import { DataSource } from 'typeorm';
import { User } from '../../../src/resources/users/user.entity';
import { UpdateUserDto } from '../../../src/resources/users/dto/update-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: any;
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

    // userRepository = module.get<UserRepository>(UserRepository);
    userRepository = {
      create: jest.fn(),
    };
    userService = new UserService(userRepository);
  });

  it('should create a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    // const createUserSpy = jest
    //   .spyOn(userRepository, 'save')
    //   .mockResolvedValue(user);
    // Called implented code
    const createUserService = await userService.create(user);

    // Expect the results
    // expect(createUserService).toStrictEqual(user);
    expect(createUserService).toBeCalledWith(user);
  });

  // it('should update a user', async () => {
  //   const toUpdateUser = {
  //     userId: 2,
  //     username: 'John Doe',
  //   } as User;

  //   jest.spyOn(userRepository, 'save').mockResolvedValue(toUpdateUser);
  //   const updateUserResult = await userService.update(toUpdateUser);

  //   expect(updateUserResult).toStrictEqual(toUpdateUser);
  // });

  // it('should find a user by id', async () => {
  //   const user = {
  //     userId: 1,
  //     username: 'John Doe',
  //   } as User;

  //   const findUserSpy = jest
  //     .spyOn(userRepository, 'findOne')
  //     .mockResolvedValue(user);

  //   const findUserResult = await userService.findById(user.userId);

  //   expect(findUserResult).toStrictEqual(user);
  //   expect(findUserSpy).toBeCalledWith(user.userId);
  // });

  // it('should return an array of users', async () => {
  //   const result = [
  //     {
  //       userId: 1,
  //       username: 'John Doe',
  //     } as User,
  //     {
  //       userId: 2,
  //       username: 'Jane Doe',
  //     } as User,
  //   ];

  //   // Mock the userRepository.findAll() method
  //   const findAllSpy = jest
  //     .spyOn(userRepository, 'find')
  //     .mockResolvedValue(result);

  //   // Expect the result to be the same as the mock
  //   expect(await userService.findAllUsers()).toStrictEqual(result);
  //   expect(findAllSpy).toBeCalled();
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
