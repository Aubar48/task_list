const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar variables de entorno desde un archivo .env

// Configuración de la base de datos desde las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASSWORD,  // Contraseña de la base de datos
  {
    host: process.env.DB_HOST || 'localhost',  // Host de la base de datos
    dialect: 'mysql',   // Dialecto de base de datos (puede ser 'mysql', 'postgres', etc.)
    port: process.env.DB_PORT || 3306,  // Puerto, por defecto 3306 para MySQL
  }
);

// Función para inicializar la base de datos
const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Se conectó a la base de datos!');
    await sequelize.sync({ force: false }); // No eliminar datos al sincronizar
  } catch (error) {
    console.error('Error al conectarse a la base de datos.', error);
  }
};

module.exports = { sequelize, initDB };
