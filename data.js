// data.js
// Esta lista seria como la base de datos de los productos.

const productos = [
    {
        id: 1,
        nombre: "Comic Superman AllStar",
        precio: 25000,
        categoria: "Comics"
    },
    {
        id: 2,
        nombre: "Batman Arkam City",
        precio: 30000,
        categoria: "Juegos"
    },
    {
        id: 3,
        nombre: "Polera Atari",
        precio: 12000,
        categoria: "Ropa"
    },
    {
        id: 4,
        nombre: "Mouse Razr",
        precio: 50000,
        categoria: "Perifericos"
    }
];

// Exportamos la lista para que el resto del programa la pueda leer
module.exports = productos;