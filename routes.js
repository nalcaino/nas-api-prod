// routes.js
const express = require('express');
const router = express.Router();
// Traemos nuestros datos del archivo data.js
const productos = require('./data');


// 1. GET: Ver los productos

router.get('/productos', (req, res) => {
    // Respondemos enviando la lista completa en formato JSON
    res.json(productos); 
});


// 2. POST: Crear un nuevo producto

router.post('/productos', (req, res) => {
    // Sacamos los datos que nos envian del cuerpo de la peticion 
    const { nombre, precio, categoria } = req.body;

    // VALIDACION: Revisamos que vengan todos los datos obligatorios
    if (!nombre || !precio || !categoria) {
        return res.status(400).json({ error: "Faltan datos: nombre, precio y categoria son obligatorios" });
    }

    // VALIDACION: Revisamos que el precio sea un numero
    if (typeof precio !== 'number') {
        return res.status(400).json({ error: "El precio debe ser un número" });
    }

    // Creamos el nuevo producto
    // El ID lo generamos automaticamente sumando 1 al total de productos
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
        categoria: categoria
    };

    // Lo agregamos a nuestra lista
    productos.push(nuevoProducto);

    // Respondemos con el código 201 (Creado) y el producto nuevo
    res.status(201).json(nuevoProducto);
});


// 3. PUT: Editar un producto

router.put('/productos/:id', (req, res) => {
    // Obtenemos el ID de la URL y lo convertimos a número
    const id = parseInt(req.params.id);
    const { nombre, precio, categoria } = req.body;

    // Buscamos el producto en la lista
    const producto = productos.find(p => p.id === id);

    // Si no lo encontramos, damos error 404
    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Si nos mandan un precio nuevo, validamos que sea número
    if (precio && typeof precio !== 'number') {
        return res.status(400).json({ error: "El precio debe ser un número válido" });
    }

    // Actualizamos los datos (si no mandan nada nuevo, dejamos lo que estaba)
    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;
    producto.categoria = categoria || producto.categoria;

    res.json(producto);
});


// 4. DELETE: Borrar un producto

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Buscamos en que posición (indice) esta el producto
    const indice = productos.findIndex(p => p.id === id);

    // Si el indice es -1, significa que no existe
    if (indice === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Eliminamos 1 elemento en esa posicion
    const eliminado = productos.splice(indice, 1);

    // Respondemos confirmando la eliminacion
    res.json({ mensaje: "Producto eliminado con éxito", producto: eliminado });
});

// Exportamos las rutas para usarlas en el servidor principal
module.exports = router;