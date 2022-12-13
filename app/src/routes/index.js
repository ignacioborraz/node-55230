<<<<<<< HEAD
import express from 'express' //importo express
const router = express.Router() //la clase Router del módulo de express

import products from './products.js' //requiero las rutas de products
import carts from './carts.js' //requiero las rutas de cart
=======
const router = require('express').Router() //requiero la clase Router del módulo de express

const products = require('./products') //requiero las rutas de products
const carts = require('./carts') //requiero las rutas de cart
>>>>>>> a67fe6ae0f56500cc93bfeceb8e8c1b4d1564e6d

router.use('/products', products) //defino que las rutas de products contengan "/products"
router.use('/carts', carts) //defino que las rutas de cart contengan "/cart"

<<<<<<< HEAD
export default router //exporto para poder usar el enrrutador principal en app.js
=======
module.exports = router //exporto para poder usar el enrrutador principal en app.js
>>>>>>> a67fe6ae0f56500cc93bfeceb8e8c1b4d1564e6d
