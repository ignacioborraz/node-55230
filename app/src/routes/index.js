const router = require('express').Router() //requiero la clase Router del módulo de express

const products = require('./products') //requiero las rutas de products
const carts = require('./carts') //requiero las rutas de cart

router.use('/products', products) //defino que las rutas de products contengan "/products"
router.use('/carts', carts) //defino que las rutas de cart contengan "/cart"

module.exports = router //exporto para poder usar el enrrutador principal en app.js