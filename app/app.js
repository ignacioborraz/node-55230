const express = require('express') //requiero el módulo de express
const app = express()  //ejecuto el método express() para crear un srvidor
const products = require('./src/products') //requiero el contenedor creado con la clase

app.use(express.json()) //middleware para convertir las respuestas en json
app.use(express.urlencoded({extended:true})) //middleware para poder leer queries y params

/* PETICION GET PARA OBTENER PRODUCTOS */
app.get('/products', async(req, res) => {
    let limit = req.query?.limit //defino una variable para el limite que viene por query (si existe)
    try {
        let prods = await products.getProducts(limit) //llamo al método de la clase para obtener productos
        if (!prods) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prods) //envio la respuesta al cliente
    } catch(error) {
        return res.status(500).send(error.message) //envio la respuesta al cliente
    }
})
//el método getProducts se modificó para que admita un limit

/* PETICION GET PARA OBTENER UN PRODUCTO */
app.get('/products/:id', async(req, res) => { //defino una peticion get
    let { id } = req.params //defino una variable para el id que viene por params
    try {
        let one = await products.getProductById(Number(id)) //llamo al método de la clase para obtener productos
        if (!one) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(one) //envio la respuesta al cliente
    } catch(error) {
        return res.status(500).send(error.message) //envio la respuesta al cliente
    }
})

/* PETICION POST PARA CREAR UN PRODUCTO */
app.post('/products', async(req, res) => { //defino una peticion post
    let { title,description,price,code,stock,thumbnail } = req.body //defino las propiedades que vienen por body (postman)
    try {
        let prod = await products.addProduct({ title,description,price,code,stock,thumbnail }) //llamo al método de la clase para crear un producto
        return res.status(200).send(prod) //envio la respuesta al cliente
    } catch(error) {
        return res.status(500).send(error.message) //envio la respuesta al cliente
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
app.put('/products/:id', async(req, res) => { //defino una peticion put
    let { id } = req.params //defino una variable para el id que viene por params
    try {
        let prod = await products.updateProduct(Number(id),req.body) //llamo al método de la clase para modificar un producto (req.body es un objeto enviado con postman)
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod) //envio la respuesta al cliente
    } catch(error) {
        return res.status(500).send(error.message) //envio la respuesta al cliente
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
app.delete('/products/:id', async(req, res) => { //defino una peticion delete
    let { id } = req.params //defino una variable para el id que viene por params
    try {
        let prod = await products.deleteProduct(Number(id)) //llamo al método de la clase para eliminar un producto
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod) //envio la respuesta al cliente
    } catch(error) {
        return res.status(500).send(error.message) //envio la respuesta al cliente
    }
})

app.set('port',8080) //seteo el puerto

app.listen( //levanto el servidor escuchando el puerto
    app.get('port'),
    () => {console.log('SERVER READY ON PORT: '+app.get('port'))}
)