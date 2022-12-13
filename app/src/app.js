import express from 'express' //importo el módulo de express
const app = express() //ejecuto el método express() para crear un srvidor

import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import errorHandler from './middlewares/errorHandler.js' //importo el manejador de rrores
import logger from 'morgan' //importo el modulo para el logger
import router from './routes/index.js' //importo el enrrutador principal

/* middlewares */
app.use(express.json()) //para convertir las respuestas en json
app.use(express.static(__dirname + '/public')) //para acceder a la carpeta public
app.use(express.urlencoded({extended:true})) //para poder leer queries y params
app.use(errorHandler) //para manejar errores
app.use(logger('dev')) //para informar por consola las peticiones realizadas
app.use('/api', router) //para enrrutar

/* template engine */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* index */
app.get('/', async(_req, res) => {
    res.status(200).render('index', { port: process.env.PORT || 8000 })
})

/* server */
app.set('port',8080) //seteo el puerto

const httpServer = app.listen( //levanto el servidor escuchando el puerto
app.get('port'),
() => {console.log('SERVER READY ON PORT: '+app.get('port'))}
)
const socketServer = new Server(httpServer)