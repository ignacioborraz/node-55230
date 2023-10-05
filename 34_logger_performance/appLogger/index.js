import express from "express";
import winston from "./middlewares/winston.js"
import errorHandler from "./middlewares/errorHandler.js";

const port = process.env.PORT || 8080

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(winston)    //registrar por consola TODAS las peticiones que se generen
app.get('/api/test',(req,res)=> {
    let response = "response" + request
    return res.status(200).json({
        message: "logger HTTP",
        response: true
    })
})
app.use(errorHandler)

app.listen(port,()=>console.log('server ready on port '+port))