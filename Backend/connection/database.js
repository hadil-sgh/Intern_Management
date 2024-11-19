import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('credit_app3', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

export default sequelize;
