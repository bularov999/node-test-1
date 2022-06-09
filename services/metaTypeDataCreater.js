const MimeType = require('../model/mimeTypeSchema')

class MetaType {
    async createMetaFile({filename, type, size}) {
        const file = await MimeType.findOne({ name: filename })
        if (file) {
            file.type = type
            file.size = size
            await file.save()
            return file

        } else {
            const newMimeType = new MimeType({
                name: filename,
                type: type,
                size: size
            })
             await newMimeType.save()
             return newMimeType
        }
    }

    async getMetaFile(filename) {
        const file = await MimeType.findOne({ name: filename })
        if (file) {
            return file
        } else {
            return new Error('file is not correct or does not exist')
        }

    }
}


module.exports = new MetaType()
