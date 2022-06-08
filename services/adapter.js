const path = require('path')
const fs = require('fs')
const metaType = require('../services/metaType')
class Adapter {
    writeFile(filename, data = "empty1",) {
        const filenamePath = path.join(__dirname, '..', 'data')
        const writer = fs.createWriteStream(path.join(filenamePath, filename))
        writer.write(data)
        return writer
    }
    readFile(filename,res) {
        const filenamePath = path.join(__dirname, '..', 'data')
        const reader = fs.createReadStream(path.join(filenamePath, filename))
        return reader        
    }
}


module.exports = new Adapter()