import express from 'express' //importo express
const router = express.Router() //la clase Router del módulo de express

import products from './products.js' //requiero las rutas de products
import carts from './carts.js' //requiero las rutas de cart

router.use('/products', products) //defino que las rutas de products contengan "/products"
router.use('/carts', carts) //defino que las rutas de cart contengan "/cart"

export default router //exporto para poder usar el enrrutador principal en app.js