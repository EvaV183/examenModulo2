//Importaciones necesarias

import express, { Request, Response } from 'express'; //Importamos los métodos Request y Response de Express
import { products } from './mock.js'; //Importamos el mock de productos

//Crea la app
const app = express();
app.use(express.json()); //Usamos el middleware de Express que recoge JSON

//Crea la conexión con el puerto para ello cogerá el archivo .env y si no lo encuentra, por defecto arrancará en el Puerto 3000
const PORT = process.env.PORT || 3000;

//Arrancamos la aplicación en el Puerto que hemos indicado antes
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Crea una array con los productos que hay en el mock
let productList = [...products];

//MÉTODOS CRUD
//Método Get
app.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const products = productList.find((p) => p.id === Number(req.params));
    res.json(products);
});

//Método Post
app.post('/products', (req: Request, res: Response) => {
    const newProduct = ({ ...req.body } = req.body);
    productList.push(newProduct);
    res.json(newProduct);
});

app.put('/products/:id', (req: Request, res: Response) => {});

app.patch('/products/:id', (req: Request, res: Response) => {});

app.delete('/products/:id', (req: Request, res: Response) => {});

//Creamos la aplicación de Express
// export const createApp = () => {

//     const app = express();
//     const _dirname = resolve();
//     const publicDir = resolve(_dirname, 'public');

//     app.disable('x-powered-by');

//     //Middlewares
//     app.use(cors());

//     //Registro de rutas
//     app.use(express.static(publicDir));
//     app.use(express.json());

//     //Manejo de errores y rutas no encontradas
//     app.use(errorManager);

//     return app;
// };
