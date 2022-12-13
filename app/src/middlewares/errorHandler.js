let errorHandler = (error,_req,res,_next) => {
    console.log(error.stack)
    res.status(500).json({
        response: 'error',
        error: error.message
    })
}

<<<<<<< HEAD
export default errorHandler
=======
module.exports = errorHandler
>>>>>>> a67fe6ae0f56500cc93bfeceb8e8c1b4d1564e6d
