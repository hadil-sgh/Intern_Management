// models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection/database.js'; 
import Credit from './Credit.js';
import Project from './Project.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    dateNaissance: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    cin: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    NumTel: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'USER', 'MANAGER'), 
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, 
});

// Define unique aliases for each association
User.hasMany(Credit, {
    foreignKey: 'userId',
    as: 'credits',
});

Credit.belongsTo(User, {
    foreignKey: 'userId',
    as: 'creditUser', // Use a unique alias
});

User.hasMany(Project, {
    foreignKey: 'userId',
    as: 'projects',
});

Project.belongsTo(User, {
    foreignKey: 'userId',
    as: 'projectUser', // Use a unique alias
});

export default User;
