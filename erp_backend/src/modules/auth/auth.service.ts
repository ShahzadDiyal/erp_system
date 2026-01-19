import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User, Role } from '../../db/models';

type LoginDTO = { email: string, password: string };

function signToken(payload: object) {
  const secret = process.env.JWT_ACCESS_SECRET as string;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '1d';

  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, secret, options);
}

export class AuthService {
  static async login(dto: LoginDTO) {
    const { email, password } = dto;
    
    if (!email || !password) {
      throw {
        statusCode: 400,
        message: 'Email and password are required'
      };
    }

    // Find user with roles - add type casting
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password_hash', 'is_active'],
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['id', 'name', 'code', 'permissions'],
        through: { attributes: [] }
      }]
    }) as any; // Add type casting here

    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    if (!user.is_active) {
      throw { statusCode: 403, message: 'Account is deactivated' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    // Extract user permissions from roles
    const permissions = new Set<string>();
    const roleNames: string[] = [];
    let isSuperAdmin = false;

    user.roles.forEach((role: any) => {
      roleNames.push(role.name);
      
      if (role.code === 'super_admin') {
        isSuperAdmin = true;
      }
      
      // Add permissions from role
      if (role.permissions && Array.isArray(role.permissions)) {
        role.permissions.forEach((permission: string) => {
          if (permission === '*') {
            isSuperAdmin = true;
          } else {
            permissions.add(permission);
          }
        });
      }
    });

    // Create JWT token
    const tokenPayload: any = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: roleNames,
      permissions: Array.from(permissions),
      isSuperAdmin: isSuperAdmin
    };

    const token = signToken(tokenPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: roleNames,
        permissions: Array.from(permissions),
        isSuperAdmin: isSuperAdmin
      },
    };
  }

  // Helper method to get user permissions
  static async getUserPermissions(userId: number): Promise<string[]> {
    const user = await User.findByPk(userId, {
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['permissions']
      }]
    }) as any;

    const permissions = new Set<string>();
    let isSuperAdmin = false;

    user.roles.forEach((role: any) => {
      if (role.permissions && Array.isArray(role.permissions)) {
        role.permissions.forEach((permission: string) => {
          if (permission === '*') {
            isSuperAdmin = true;
          } else {
            permissions.add(permission);
          }
        });
      }
    });

    if (isSuperAdmin) {
      return ['*'];
    }

    return Array.from(permissions);
  }
}