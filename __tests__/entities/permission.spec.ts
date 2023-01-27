import { Permission } from '../../src/entities/permission.entity';

describe('Permission entity', () => {
  let permission: Permission;

  beforeEach(() => {
    permission = new Permission();
    permission.permissionId = 1;
    permission.permissionName = 'view_users';
    permission.createdAt = new Date();
    permission.updatedAt = new Date();
  });

  it('should have a permissionId', () => {
    expect(permission.permissionId).toBeDefined();
  });

  it('should have a permissionName', () => {
    expect(permission.permissionName).toBeDefined();
  });

  it('should have a createdAt', () => {
    expect(permission.createdAt).toBeDefined();
  });

  it('should have a updatedAt', () => {
    expect(permission.updatedAt).toBeDefined();
  });
});
