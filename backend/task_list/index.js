const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const { initDB } = require('./config/dataBase');  // Importa solo la función initDB
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Rutas
app.use('/api/tasks', taskRoutes);

app.listen(PORT, async () => {
  await initDB();  // Llama a la función initDB para inicializar la base de datos
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
