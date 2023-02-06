import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/resources/users/user.controller';
import { UserService } from '../../../src/resources/users/user.service';
import { UserRepository } from '../../../src/resources/users/user.repository';
import { DataSource, DeleteResult } from 'typeorm';
import { User } from '../../../src/resources/users/user.entity';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const createUserSpy = jest.spyOn(service, 'create').mockResolvedValue(user);
    const result = await controller.create(user);
    expect(result).toEqual(user);
    expect(createUserSpy).toHaveBeenCalledWith(user);
  });

  it('should find a user by id', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    jest.spyOn(service, 'findById').mockImplementation(async () => user);

    const result = await controller.findById(user.userId);
    expect(result).toEqual(user);
    expect(service.findById).toHaveBeenCalledWith(user.userId);
  });

  it('should find all users', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    jest.spyOn(service, 'findAllUsers').mockImplementation(async () => [user]);

    const result = await controller.findAll();
    expect(result).toEqual([user]);
    expect(service.findAllUsers).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const updateUserSpy = jest.spyOn(service, 'update').mockResolvedValue(user);
    const result = await controller.update(user);
    expect(result).toEqual(user);
    expect(updateUserSpy).toHaveBeenCalledWith(user);
  });

  it('should delete a user', async () => {
    const user = {
      userId: 1,
      username: 'John Doe',
    } as User;

    const deleteUserSpy = jest
      .spyOn(service, 'delete')
      .mockImplementation(async () => ({ affected: 1 } as DeleteResult));
    const result = await controller.delete(user);
    expect(result).toEqual(true);
    expect(deleteUserSpy).toHaveBeenCalledWith(user.userId);
  });
});
