// src/db/models/UserRole.ts - REMOVE init from here
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
    declare user_id: number;
    declare role_id: number;
}

// REMOVE UserRole.init() from here - move to index.ts
export default UserRole;