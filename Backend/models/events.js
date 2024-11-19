import { DataTypes } from 'sequelize';
import sequelize from '../connection/database.js';
import User from './user.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event: {
    type: DataTypes.ENUM(
      'ORIENTATION',
      'TRAINING',
      'TEAM_BUILDING',
      'MENTORSHIP_MEETING',
      'PROJECT_PRESENTATION',
      'HACKATHON',
      'PERFORMANCE_REVIEW',
      'NETWORKING',
      'CAREER_DEVELOPMENT',
      'SOCIAL_EVENT',
      'EXIT_INTERVIEW',
      'Q&A_SESSION',
      'COMPANY_OVERVIEW',
      'INTERNAL_COMPETITION'
    ),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
});


Event.belongsToMany(User, { through: 'EventUsers', as: 'users' });
User.belongsToMany(Event, { through: 'EventUsers', as: 'events' });

export default Event;
