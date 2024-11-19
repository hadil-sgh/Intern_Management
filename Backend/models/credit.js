import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';

const Credit = sequelize.define('Credit', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    creditType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    creditDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'credit',
});

export default Credit;
