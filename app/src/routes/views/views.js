import express from 'express'
const router = express.Router()

import products from '../../controllers/product.js'

/* PETICION GET PARA VER HOME CON TODOS PRODUCTOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await products.getProducts(limit)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('index', {
            title: "list of products",
            nav: [
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            products: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA VER DETALLE DE UN PRODUCTO */
router.get('/detail/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await products.getProductById(Number(id))
        if (!response) {
            return res.status(404).render('error',{
                message: 'invalid id'
            })
        }
        return res.status(200).render('detail', {
            title: "list of products",
            nav: [
                { url: "/", title: "home" },
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            product: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA ACCEDER AL CHAT */
router.get('/chat', async(req, res) => {
    try {
        res.status(200).render('chat', {
            title: "chat",
            nav: [
                { url: "/", title: "list" },
                { url: "/form", title: "form" }
            ],
            fileScript: "chat"
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})


/* PETICION GET PARA VER UN FORMULARIO DE NUEVO PRODUCTO */
router.get('/form', async(req, res) => {
    try {
        res.status(200).render('form', {
            title: "new product",
            nav: [
                { url: "./", title: "list" },
                { url: "/chat", title: "chat" }
            ],
            fileScript: "newProduct"
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION POST PARA CREAR UN PRODUCTO */
router.post('/new-product', async(req, res, next) => {
    let { title,description,price,code,stock,thumbnail } = req.body
    try {
        let response = await products.addProduct({ title,description,price,code,stock,thumbnail })        
        if (response.message === 'product created') {
            let prods = await products.getProducts(req.query.limit)
            return res.status(200).render('index', {
                title: "list of products",
                nav: [
                    { url: "/form", title: "form" },
                    { url: "/chat", title: "chat" }
                ],
                products: prods
            })
        } else {
            return res.status(400).render('error',{
                message: response.message
            })
        }        
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.updateProduct(Number(id),req.body)
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.deleteProduct(Number(id))
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

export default router