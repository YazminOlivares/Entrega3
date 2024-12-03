require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const logger = require('./middleware/logger'); 
const { mongoose, redisClient } = require('./config/db'); 

// Importamos las rutas
const enviosRoutes = require('./routes/enviosRoutes');

// Creamos una instancia de la aplicación Express
const app = express();
// Middleware para parsear solicitudes JSON
app.use(express.json());
// Middleware para permitir solicitudes de recursos cruzados
app.use(cors());
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));
// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);
// Usamos las rutas importadas
app.use('/envios', enviosRoutes);

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 3000;
// Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
console.log(`Servidor corriendo en puerto ${PORT}`);
});