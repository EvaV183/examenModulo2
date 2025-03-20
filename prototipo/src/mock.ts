import { Product } from './server1.js'; //Importamos el interfaz de Product

//MOCK DE PRODUCTOS
export const products: Product[] = [
    {
        id: 1,
        name: 'Cámara',
        price: 100,
        stock: 10,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 1,
        name: 'Smartphone',
        price: 100,
        stock: 10,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
];
