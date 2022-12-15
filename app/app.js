import express from 'express'
const app = express()

import __dirname from './src/utils.js'
import errorHandler from './src/middlewares/errorHandler.js'
import router from './src/routes/index.js'
import viewsRouter from './src/routes/views/index.js'

/* libraries */
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import logger from 'morgan'

/* middlewares */
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(errorHandler)
app.use(logger('dev'))

/* router */
app.use('/', viewsRouter)
app.use('/api', router)

/* template engine */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* server */
app.set('port',8080) //seteo el puerto
const httpServer = app.listen( //levanto el servidor escuchando el puerto
    app.get('port'),
    () => console.log('SERVER READY ON PORT: '+app.get('port'))
)

/* socket */
let messages = []
const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    //console.log(socket) para ver propiedades y métodos disponibles
    console.log(`client ${socket.id} connected`)
    socket.on('message', data => { //on escucha una emisión, la cb maneja lo que recibe
        //en este caso, si viene un objeto con el nuevo mensaje, se emite hacia los clientes los mensajes
        if (typeof data != 'string' ) {
            messages.push(data)
            //console.log(messages)
            let length = messages.length
            if (length > 10) { //muestro siempre 10 mensajes
                socketServer.emit('messageLogs', [...messages].splice(length-10,length))
            } else if (length > 0) {
                socketServer.emit('messageLogs', messages)
            }
        }
    })
    socket.on('authenticated', () => { //on escucha una emisión, la cb maneja lo que recibe
        //en este caso, si existen mensajes al autenticarse, se emite hacia los cleintes los mensajes
        let length = messages.length
        if (length > 10) {
            socketServer.emit('messageLogs', [...messages].splice(length-10,length))
        } else if (length > 0) {
            socketServer.emit('messageLogs', messages)
        }
    })
})