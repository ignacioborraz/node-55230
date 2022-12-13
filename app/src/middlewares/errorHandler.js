let errorHandler = (error,_req,res,_next) => {
    console.log(error.stack)
    res.status(500).json({
        response: 'error',
        error: error.message
    })
}

export default errorHandler