import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/resources/users/user.service';
import { UserRepository } from '../../src/resources/users/user.repository';
import { DataSource } from 'typeorm';
import { User } from '../../src/resources/users/user.entity';
import { UpdateCatDto } from 'src/dtos/update-cat.dto';

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

    userRepository = module.get<UserRepository>(UserRepository);
    userService = new UserService(userRepository);
  });

  it('should called userRepository.create with a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const createUserSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);
    // Called implented code
    const createUserService = await userService.create(user);

    // Expect the results
    expect(createUserService).toStrictEqual(user);
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
    expect(await userService.findAllUsers()).toStrictEqual(result);
    expect(findAllSpy).toBeCalled();
  });

  it('should called repository.update() with UpdateUserDTO', async () => {
    const updateUser = {
      userId: 1,
      username: 'John Doe',
    } as UpdateCatDto;

    const updateUserSpy = jest.spyOn(userRepository, 'update');
    const updateUserResult = await userService.update(updateUser);
    expect(updateUserResult).toStrictEqual(updateUser);
    expect(updateUserSpy).toBeCalledWith(updateUser);
  });

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
