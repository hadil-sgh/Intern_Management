import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';

const PaymentDetails = sequelize.define('PaymentDetails', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    creditAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    annualInterestRate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    creditDurationInYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creditStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'payment_details',
});

export default PaymentDetails;
