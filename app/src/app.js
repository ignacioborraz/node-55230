const express = require('express') //requiero el módulo de express
const app = express()  //ejecuto el método express() para crear un srvidor
const errorHandler = require('./middlewares/errorHandler')
const logger = require('morgan')
const router = require('./routes/index') //requiero el contenedor creado con la clase

/* middlewares */
app.use(express.json()) //para convertir las respuestas en json
app.use(express.urlencoded({extended:true})) //para poder leer queries y params
app.use(errorHandler) //para manejar errores
app.use(logger('dev')) //para informar por consola las peticiones realizadas
app.use('/api', router) //para enrrutar

app.get('/', async(_req, res) => {
    res.status(200).json({
        enviroment: process.env.NODE_ENV || undefined,
        port: process.env.PORT || 8000
    })
})

app.set('port',8080) //seteo el puerto

app.listen( //levanto el servidor escuchando el puerto
    app.get('port'),
    () => {console.log('SERVER READY ON PORT: '+app.get('port'))}
)