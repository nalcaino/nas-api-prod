// index.js
const express = require('express'); // Importamos Express
const app = express();
const routes = require('./routes'); // Importamos nuestras rutas desde routes.js

// Definimos el puerto
const PORT = 3000;

// Esto permite que el servidor entienda los datos que enviamos en formato JSON
app.use(express.json());

// Conectamos nuestras rutas.
// Al ponerle '/api', todas las rutas empezarán con eso (ej: /api/productos)
app.use('/api', routes);

// Mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('¡API de Productos Ñoños!');
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo y listo en http://localhost:${PORT}`);
});