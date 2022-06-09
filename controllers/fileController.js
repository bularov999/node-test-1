const adapter = require('../services/adapter')

class FileController {
    putFileController(req, res) {
        const data = req.buf
        const filename = req.params.filename
        const writer = adapter.writeFile(filename, data)
        res.send('file was created')

    }
    async getFileController(req, res) {
        const filename = req.params.filename
        const { filePath, type, size } = await adapter.getFile(filename)
        res.sendFile(filePath, {
            header: {
                'Content-Type': type,
                'Content-Length': size
            }
        })
    }
}

module.exports = new FileController()