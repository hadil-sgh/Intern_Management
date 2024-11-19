import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import User from './user.js';


const Performance = sequelize.define('Performance', {
  idperformence: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Performance.belongsTo(User, { foreignKey: 'userId' });

export default Performance;
