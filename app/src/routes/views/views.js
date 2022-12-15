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
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
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
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
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
            { url: "./", title: "list" },
            { url: "/chat", title: "chat" }
        ]
    })
})

/* PETICION GET PARA ACCEDER AL CHAT */
router.get('/chat', async(req, res) => {
    res.status(200).render('chat', {
        title: "chat",
        nav: [
            { url: "/", title: "list" },
            { url: "/form", title: "form" }
        ],
        fileScript: "chat"
    })
})

export default router