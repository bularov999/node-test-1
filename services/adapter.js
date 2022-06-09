const path = require('path')
const fs = require('fs')
const metaType = require('./metaTypeDataCreater')
const mimeTypeHelper = require('./mimeTypeHelper')
class Adapter {

    writeFile(reqFilename, data = "empty1",) {
        const filenamePath = path.join(__dirname, '..', 'data')
        const writer = fs.createWriteStream(path.join(filenamePath, reqFilename))
        writer.write(data)

        writer.on('finish', async () => {
            const file = path.join(__dirname, '..', 'data', reqFilename)
            const filename = path.basename(file)
            const ext = mimeTypeHelper.getExt(filename)
            const contentType = mimeTypeHelper.getContentType(ext)
            const fileSize = fs.statSync(file).size

            await metaType.createMetaFile({
                filename: filename,
                type: contentType,
                size: fileSize
            })
        })
        writer.end()
    }

    readFile(filename, res) {
        const filenamePath = path.join(__dirname, '..', 'data')
        const reader = fs.createReadStream(path.join(filenamePath, filename))
        return reader
    }

    async getFile(filename) {
        const existFile = fs.existsSync(path.join(__dirname, '..', 'data', filename))
        if (existFile) {
            const filePath = path.join(__dirname, '..', 'data', filename)
            const fileMeta = await metaType.getMetaFile(filename)
            return {
                filePath,
                type: fileMeta.type,
                size: fileMeta.size
            }
        } else {
            return new Error('file doesnt exists')
        }

    }
}

module.exports = new Adapter()