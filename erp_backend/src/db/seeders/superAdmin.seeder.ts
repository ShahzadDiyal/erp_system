// src/db/seeders/superAdmin.seeder.ts - FIXED
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';

export async function seedSuperAdmin() {
  try {
    // 1. Create Super Admin Role
    const [superAdminRole] = await Role.findOrCreate({
      where: { code: 'super_admin' },
      defaults: {
        name: 'Super Admin',
        code: 'super_admin',
        description: 'Full system administrator with all permissions',
        permissions: ['*'], // Wildcard for all permissions
        allowed_branch_types: ['all'],
        hierarchy_level: 0,
        is_system: true
      }
    });

    // 2. Check if Super Admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: 'superadmin@erp.com' }
    });

    if (!existingAdmin) {
      // 3. Create Super Admin user
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
      const passwordHash = await bcrypt.hash('Admin@123', saltRounds);

      const superAdmin = await User.create({
        name: 'Super Administrator',
        email: 'superadmin@erp.com',
        password_hash: passwordHash,
        is_active: true
      });

      // 4. Assign Super Admin role to the user
      await UserRole.create({
        user_id: superAdmin.id,
        role_id: superAdminRole.id
      });

      console.log('✅ Super Admin created successfully');
      console.log('📧 Email: superadmin@erp.com');
      console.log('🔑 Password: Admin@123');
    } else {
      console.log('✅ Super Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
  }
}