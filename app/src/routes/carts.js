import express from 'express'
const router = express.Router()

import carts from '../controllers/cart.js'

/* PETICION GET PARA VER CARRITOS */
router.get('/', async(req, res, next) => {
    try {
        let cart = await carts.getCarts()
        if (!cart) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(cart)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA AGREGAR UN PRODUCTO A UN CARRITO */
router.put('/:cid/add/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let cart = await carts.addProductToCart(Number(cid),Number(pid))
        if (!cart) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(cart)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA QUITAR UN PRODUCTO A UN CARRITO */
router.put('/:cid/delete/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let cart = await carts.deleteProductFromCart(Number(cid),Number(pid))
        if (!cart) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(cart)
    } catch(error) {
        return next()
    }
})

export default router