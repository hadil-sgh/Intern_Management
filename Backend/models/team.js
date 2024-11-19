import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import User from './user.js';
const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Team.belongsToMany(User, { through: 'TeamUsers', as: 'users' });
User.belongsToMany(Team, { through: 'TeamUsers', as: 'teams' });

export default Team;
