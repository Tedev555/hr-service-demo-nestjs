import { Role } from '../../src/entities/role.entity';

describe('Role entity', () => {
  let role: Role;

  beforeEach(() => {
    role = new Role();
    role.roleId = 1;
    role.roleName = 'admin';
    role.createdAt = new Date();
    role.updatedAt = new Date();
  });

  it('should create an instance of Roles', () => {
    expect(role).toBeTruthy();
  });

  it('should have a role_id of 1', () => {
    expect(role.roleId).toEqual(1);
  });

  it('should have a role_name of "admin"', () => {
    expect(role.roleName).toEqual('admin');
  });

  it('should have a created_at date', () => {
    expect(role.createdAt).toBeTruthy();
  });

  it('should have an updated_at date', () => {
    expect(role.updatedAt).toBeTruthy();
  });
});
