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

const socketServer = new Server(httpServer)
socketServer.on(
    'connection',
    socket => {
        console.log('SOCKET READY')
        socket.on(
            'message',
            data => console.log('FROM CLIENT: '+data)
        )
        socket.emit('para_uno','le llega solo a uno')
        socket.broadcast.emit('para_todos','le llega a todos')
    }
)