import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case for the method findAll()
  it('should return an array of users', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(await service.findAll()).toBe(result);
  });
});
