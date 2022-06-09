
module.exports = function (req, res, next) {
    let buf = new Buffer('')
    req.on('data', (chunk) => {
        buf = Buffer.concat([buf, chunk])
    })

    req.on('end', () => {
        req.buf = buf
        next()
    })  
}