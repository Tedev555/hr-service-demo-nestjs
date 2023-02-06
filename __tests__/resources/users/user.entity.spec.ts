import { Role } from '../../../src/entities/role.entity';
import { User } from '../../../src/resources/users/user.entity';
describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('should have a user_id', () => {
    user.userId = 1;
    expect(user.userId).toBe(1);
  });

  it('should have a username', () => {
    user.username = 'JohnDoe';
    expect(user.username).toBe('JohnDoe');
  });

  it('should have an email', () => {
    user.email = 'johndoe@example.com';
    expect(user.email).toBe('johndoe@example.com');
  });

  it('should have a password', () => {
    user.password = 'password';
    expect(user.password).toBe('password');
  });

  it('should have a created_at timestamp', () => {
    user.createdAt = new Date();
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should have an updated_at timestamp', () => {
    user.updatedAt = new Date();
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a many-to-many relationship with Role entity', () => {
    const role1 = new Role();
    const role2 = new Role();
    user.roles = [role1, role2];
    expect(user.roles).toContain(role1);
    expect(user.roles).toContain(role2);
  });
});
