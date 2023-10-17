export default function (req,res,next) {
    try {
        return res.status(404).json({
            message: req.method+": "+req.url,
            response: null
        })
    } catch (error) {
        next(error)
    }
}