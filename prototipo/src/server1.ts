//Importaciones necesarias
import express from 'express'; //Importamos los métodos Request y Response de Express
import { products } from './mock.js'; //Importamos el mock de productos
import cors from 'cors';

//Creamos la app
const app = express();
app.use(express.json()); //Usamos el middleware de Express que recoge JSON
app.use(cors()); //Usamos cors para gestionar peticiones

//Creamos la conexión con el puerto para ello cogerá el archivo .env y si no lo encuentra, por defecto arrancará en el Puerto 3000
const PORT = process.env.PORT || 3000;

//Arrancamos la aplicación en el Puerto que hemos indicado antes y mostramos por consola
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Interfaz de Producto
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

//Creamos una variable NextId con la longitud del array +1 (porque los arrays empiezan en 0) para poder usarlo para luego poder hacer el auto-incremento
let nextId = products.length + 1;

//MÉTODOS CRUD
//Método Get
app.get('/products', (req, res) => {
    res.json(products); //Nos devuelve el JSON con todos los productos
});

//Método Get By Id
app.get('/products/:id', (req, res) => {
    const product = products.find((p) => p.id === Number(req.params.id)); //Buscamos por ID el producto que queremos encontrar
    //Devolvemos el producto encontrado y si no lo encuentra devolvemos un error 404
    product
        ? res.json(product) //Devuelve el producto buscado
        : res.status(404).json({ error: 'Producto no encontrado' }); //Si no lo encuentra devuelve un error 404
});

//Método Post
app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;

    const newProduct: Product = {
        id: nextId++,
        name,
        price,
        stock,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
    products.push(newProduct); //Añadimos el producto creado a products
    res.status(201).json(newProduct); //Devolvemos un 201 y los datos del producto introducido
});

//Método Patch
app.put('/products/:id', (req, res) => {
    const product = products.find((p) => p.id === Number(req.params.id)); //Buscamos por ID el producto que vamos a modificar

    const { name, price, stock, is_active } = req.body;
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.is_active = is_active ?? product.is_active;
    product.created_at = new Date();
    product.updated_at = new Date();

    res.json(product); //Devuelve el producto modificado
});

//Método Delete
app.delete('/products/:id', (req, res) => {
    //Buscamos en productos por la Id del producto que queremos eliminar
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    products.splice(index, 1);
    res.status(204).send();
});
