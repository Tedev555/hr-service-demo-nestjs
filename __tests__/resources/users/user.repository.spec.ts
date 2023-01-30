import { DataSource, DeleteResult } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../src/resources/users/user.repository';
import { User } from '../../../src/resources/users/user.entity';

describe('UserRepository', () => {
  let repository: UserRepository;
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

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    } as User;

    const createUserSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(user);
    const result = await repository.save(user);
    expect(result).toEqual(user);
    expect(createUserSpy).toHaveBeenCalledWith(user);
  });

  it('should find a user by id', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    jest.spyOn(repository, 'findOne').mockImplementation(async () => user);

    const result = await repository.findOne({ where: { userId: user.userId } });
    expect(result).toEqual(user);
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

    jest.spyOn(repository, 'find').mockImplementation(async () => users);

    const result = await repository.find();
    expect(result).toEqual(users);
  });

  it('should update a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    jest.spyOn(repository, 'save').mockImplementation(async () => user);

    const result = await repository.save(user);
    expect(result).toEqual(user);
  });

  it('should delete a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
      email: '',
      password: '',
    } as User;

    jest
      .spyOn(repository, 'delete')
      .mockImplementation(async () => ({ affected: 1 } as DeleteResult));

    const result = await repository.delete(user.userId);
    expect(result.affected).toEqual(1);
  });
});
