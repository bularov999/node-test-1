const path = require('path')
const fs = require('fs')
const mime = require('mime-types')
class MetaType {
    createMetaFile(file) {
        const storePath = path.join(__dirname, '..', 'store')
        
        const fileStats = fs.statSync(file)
        const meta = {
            'name': path.basename(file, path.extname(file)),
            'content-length': fileStats.size,
            'content-type': mime.lookup(path.extname(file))
        }
        const metaJSON = JSON.stringify(meta)
        const writer = fs.createWriteStream(path.join(storePath, path.basename(file)))
        writer.write(metaJSON)
        writer.end()
        return writer

    }
    
    readMetaFile(file) {
        const storePath = path.join(__dirname, '..', 'store')
        const reader = fs.createReadStream(path.join(storePath, file))
        return reader
    }
}


module.exports = new MetaType()
