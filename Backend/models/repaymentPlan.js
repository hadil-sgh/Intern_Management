import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import Credit from './Credit.js';
import PaymentDetails from './PaymentDetails.js';
const RepaymentPlan = sequelize.define('RepaymentPlan', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    startingBalance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    startingBalanceReimbursementAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    repaymentOfCapital: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    remainingDueBalance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    interestAndCumulate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    creditId: {
        type: DataTypes.BIGINT,
        references: {
            model: Credit,
            key: 'id',
        },
    },
    paymentDetailsId: {
        type: DataTypes.BIGINT,
        references: {
            model: PaymentDetails,
            key: 'id',
        },
    },
}, {
    tableName: 'repayment_plan',
});

Credit.hasOne(RepaymentPlan, { foreignKey: 'creditId' });
PaymentDetails.hasMany(RepaymentPlan, { foreignKey: 'paymentDetailsId' });

RepaymentPlan.belongsTo(Credit, { foreignKey: 'creditId' });
RepaymentPlan.belongsTo(PaymentDetails, { foreignKey: 'paymentDetailsId' });

export default RepaymentPlan;
