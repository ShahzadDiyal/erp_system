// src/db/models/User.ts - REMOVE init from here
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password_hash: string;
    declare is_active: CreationOptional<boolean>;
}

// REMOVE User.init() from here - move to index.ts
export default User;