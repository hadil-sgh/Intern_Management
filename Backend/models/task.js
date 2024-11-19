import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import User from './user.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'), 
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'), 
    allowNull: false,
  },
}, {
  timestamps: false,
});

Task.belongsTo(User, { foreignKey: 'userId' });

export default Task;
