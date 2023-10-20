import express from 'express'
import usersRouter from './routes/user.route.js'

const app = express()

app.use('/users', usersRouter)

app.listen(8080,()=>console.log("server ready"))