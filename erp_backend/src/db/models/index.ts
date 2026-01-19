// src/db/models/index.ts - UPDATE THIS FILE
import sequelize from '../../config/database';
import { DataTypes } from 'sequelize';

// Import model classes
import Role from './Role';
import User from './User';
import UserRole from './UserRole';

// Initialize Role model HERE
Role.init({
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    code: {
        type: DataTypes.STRING, allowNull: false, unique: true
    },
    description: {
        type: DataTypes.STRING, allowNull: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
    },
    allowed_branch_types: {
        type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
    },
    hierarchy_level: {
        type: DataTypes.INTEGER, defaultValue: 0
    },
    is_system: {
        type: DataTypes.BOOLEAN, defaultValue: false
    }
},
{ sequelize, tableName: 'roles', underscored: true });

// Initialize User model
User.init({
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    },
    name: {
        type: DataTypes.STRING(120), allowNull: false
    },
    email: {
        type: DataTypes.STRING(160), allowNull: false, unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255), allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
    },
},
{ sequelize, tableName: 'users', underscored: true });

// Initialize UserRole model
UserRole.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: User, key: 'id' }
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: Role, key: 'id' }
    },
},
{ sequelize, tableName: 'user_roles', underscored: true });

// Define associations
User.belongsToMany(Role, {
    through: UserRole,
    as: 'roles',
    foreignKey: 'user_id',
    otherKey: 'role_id'
});

Role.belongsToMany(User, {
    through: UserRole,
    as: 'users',
    foreignKey: 'role_id',
    otherKey: 'user_id'
})

export {
    User,
    Role,
    UserRole
};