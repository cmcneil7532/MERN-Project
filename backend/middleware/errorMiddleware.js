const handleError = (err,req, res, next)=>{
    //Override if status Code isnt set already 
    const statusCode = res.statusCode ? res.statusCode: 500

    res.status(statusCode)
    //If we get an error 
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    handleError
}