import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/services/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: any;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [UserService],
    // }).compile();

    // service = module.get<UserService>(UserService);
    userRepositoryMock = {
      findAll: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };
    userService = new UserService(userRepositoryMock);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userService.create should accept a user as a parameter', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
    };

    await userService.create(user);
    expect(userRepositoryMock.create).toBeCalledWith(user);
  });

  it('called userRepository.create(user) should return a user', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
    };

    userRepositoryMock.create.mockReturnValue(user);
    expect(await userService.create(user)).toStrictEqual(user);
  });

  it('should return an array of users', async () => {
    const result = [
      {
        id: 1,
        name: 'John Doe',
      },
    ];
    userRepositoryMock.findAll.mockReturnValue(result);
    expect(await userService.findAllUsers()).toStrictEqual(result);
  });

  it('userRepository.findById() should be called with id', async () => {
    const id = 1;
    await userService.findById(id);
    expect(userRepositoryMock.findById).toBeCalledWith(id);
  });

  it('called userRepository.findById() should return a user', async () => {
    const result = {
      id: 1,
      name: 'John Doe',
    };

    userRepositoryMock.findById.mockReturnValue(result);
    expect(await userService.findById(result.id)).toStrictEqual(result);
  });
});
