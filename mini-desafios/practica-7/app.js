const express = require('express') //primero requiero el modulo de express
const app = express() //ejecuto el módulo para crear una app de back (un servidor)
const palabras = require('./src/palabras')

app.use(express.json()) //middleware para convertir las respuestas en json
app.use(express.urlencoded({extended:true})) //middleware para poder leer queries y params

/* 
POST '/api/palabras':
recibe un objeto con una palabra bajo el campo ‘palabra’
y la agrega al final de la frase.
Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada,
y en el campo ‘pos’ la posición en que se agregó dicha palabra.
*/
app.post( //a la app le agregamos una peticion de tipo POST, requiere dos parámetros
    '/api/palabras', //el primer parámetro es la ruta de la peticion
    async(req,res) => { //el segundo parámetro es la función que se va a ejecutar cada vez que el cliente "llame" a esta ruta
        //el objeto req con todos los requerimientos que necesita para funcionar
        //el objeto res que será la respuesta al cliente que realizó la petición
        let palabra = req.body //obtengo la info del body de la peticion
        try {
            let nueva = await palabras.agregarPalabra(palabra) //espero que se ejecute el método de la clase
            if (nueva) {
                return res.status(200).send(nueva) //respondo
            }
            let response = { error: 'la palabra ya fue ingresada' }
            return res.status(404).send(response)
        } catch(err) {
            console.log(err)
            let response = { error: err.message } //defino el objeto de la respuesta
            return res.status(500).send(response) //respondo
        }
    }
)

/* 
GET '/api/frase':
devuelve un objeto que como campo ‘frase’ contenga la frase completa
*/
app.get(
    '/api/frase',
    async(req,res) => {
        try {
            let frase = await palabras.obtenerFrase()
            if (frase) {
                return res.status(200).send({ frase })
            }
            let response = { error: 'not found' }
            return res.status(404).send(response)
        } catch(err) {
            console.log(err)
            let response = { error: err.message }
            return res.status(500).send(response)
        }
    }
)

/*
GET '/api/palabras/:pos':
devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada
(considerar que la primera palabra es la #1)
*/
app.get(
    '/api/palabras/:pos',
    async(req,res) => {
        let { pos } = req.params
        try {
            let buscada = await palabras.obtenerPalabra(pos)
            if (buscada) {
                return res.status(200).send({ buscada })    
            }
            let response = { error: 'not found' }
            return res.status(404).send(response)
        } catch(err) {
            console.log(err)
            let response = { error: err.message }
            return res.status(500).send(response)
        }
    }
)

/*
PUT '/api/palabras/:pos':
recibe un objeto con una palabra bajo el campo ‘palabra’ y
reemplaza en la frase aquella hallada en la posición dada.
Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y
en el campo ‘anterior’ la anterior.
*/
app.put(
    '/api/palabras/:pos',
    async(req,res) => {
        let { pos } = req.params
        let palabra = req.body
        try {            
            let actualizada = await palabras.modificarPalabra(pos,palabra)
            if (actualizada) {
                return res.status(200).send(actualizada)
            }
            let response = { error: 'no existe esa posición o ya existe esa palabra' }
            return res.status(404).send(response)
        } catch(err) {
            console.log(err)
            let response = { error: err.message }
            return res.status(500).send(response)
        }
    }
)

/*
DELETE '/api/palabras/:pos':
elimina una palabra en la frase, según la posición dada
(considerar que la primera palabra tiene posición #1)
*/
app.delete(
    '/api/palabras/:pos',
    async(req,res) => {
        let { pos } = req.params
        try {
            let eliminada = await palabras.eliminarPalabra(pos)
            if (eliminada) {
                return res.status(200).send(eliminada)    
            }
            let response = { error: 'no existe esa posición' }
            return res.status(404).send(response)
        } catch(err) {
            console.log(err)
            let response = { error: err.message }
            return res.status(500).send(response)
        }
    }
)

app.listen(
    8000,
    ()=>{console.log('server ready on port 8000')}
)