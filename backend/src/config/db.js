import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'rhythm',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);


async function initialize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco conectado com sucesso!');
  } catch (error) {
    console.error('Falha na conexão:', error);
  }
}

export { initialize, sequelize };