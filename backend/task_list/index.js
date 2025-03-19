const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const { initDB } = require('./config/dataBase');  // Importa solo la función initDB
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = 3000;
const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'API de Tareas', // Título de la API
      version: '1.0.0', // Versión
      description: 'API para gestionar tareas', // Descripción de la API
    },
  },
  apis: ['./routes/*.js'], // Apunta a las rutas donde se encuentra la documentación (ajusta según tu estructura)
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Rutas
app.use('/api/tasks', taskRoutes);

// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
app.listen(PORT, async () => {
  await initDB();  // Llama a la función initDB para inicializar la base de datos
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/tasks`);
  console.log(`La documentación esta corriendo en http://localhost:${PORT}/api-docs`);
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
