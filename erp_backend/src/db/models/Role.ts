// src/db/models/Role.ts - FIXED
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// Define the class WITHOUT initializing
export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<number>
    declare name: string
    declare code: string
    declare description: CreationOptional<string>
    declare permissions: CreationOptional<string[]>
    declare allowed_branch_types: CreationOptional<string[]>
    declare hierarchy_level: CreationOptional<number>
    declare is_system: CreationOptional<boolean>
}

export default Role;