import express from 'express'
const router = express.Router()

import products from '../../controllers/product.js'

/* PETICION GET PARA VER HOME CON TODOS PRODUCTOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let prods = await products.getProducts(limit)
        if (!prods) {
            return res.status(404).render({error: 'not found'})
        }
        return res.status(200).render('index', {
            title: "list of products",
            nav: [
                { url: "/form", title: "form" }
            ],
            products: prods
        })
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA VER DETALLE DE UN PRODUCTO */
router.get('/detail/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let one = await products.getProductById(Number(id))
        if (!one) {
            return res.status(404).render({error: 'not found'})
        }
        return res.status(200).render('detail', {
            title: "list of products",
            nav: [
                { url: "/", title: "home" },
                { url: "/form", title: "form" }
            ],
            product: one
        })
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA VER UN FORMULARIO DE NUEVO PRODUCTO */
router.get('/form', async(req, res) => {
    res.status(200).render('form', {
        title: "new product",
        nav: [
            { url: "./", title: "list" }
        ]
    })
})

/* PETICION POST PARA CREAR UN PRODUCTO */
router.post('', async(req, res, next) => {
    let { title,description,price,code,stock,thumbnail } = req.body
    try {
        let prod = await products.addProduct({ title,description,price,code,stock,thumbnail })
        return res.status(200).render(prod)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.updateProduct(Number(id),req.body)
        if (!prod) {
            return res.status(404).render({error: 'not found'})
        }
        return res.status(200).render(prod)
    } catch(error) {
        return next()
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.deleteProduct(Number(id))
        if (!prod) {
            return res.status(404).render({error: 'not found'})
        }
        return res.status(200).render(prod)
    } catch(error) {
        return next(error)
    }
})

export default router