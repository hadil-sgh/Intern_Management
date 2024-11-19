import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import Credit  from './Credit.js';
import { v4 as uuidv4 } from 'uuid';  

const Contract = sequelize.define('Contract', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    contractReference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => `CONTRACT-${uuidv4()}`, 
    },
    borrower: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    interestRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    interestRateType: {
        type: DataTypes.ENUM('FIXED', 'VARIABLE'),
        allowNull: false,
    },
    collateralDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    residenceLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditId: {
        type: DataTypes.BIGINT,
        references: {
            model: Credit,
            key: 'id',
        },
    },
}, {
    tableName: 'contract',
});

Credit.hasOne(Contract, { foreignKey: 'creditId' });
Contract.belongsTo(Credit, { foreignKey: 'creditId' });

export default Contract;
