
import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection/database.js';

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: false,
});

export default Project;
