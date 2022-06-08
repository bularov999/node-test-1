const express = require('express')
const router = express.Router()
const path = require('path')
const adapter = require('../services/adapter')
const metaType = require('../services/metaType')

router.post('/', (req, res) => {
    const param = req.files.file
    const meta = metaType.readMetaFile(param.name)
    meta.on('data', (data) => {
        res.sendFile(path.join(__dirname, '..', 'data', param.name), {
            header: JSON.parse(data)
        })
    })
})

router.put('/', (req, res) => {
    const param = req.files.file
    const writer = adapter.writeFile(param.name, param.data)
    writer.on('finish', () => {
        const file = path.join(__dirname, '..', 'data', param.name)
        const meta = metaType.createMetaFile(param.name)
        res.sendFile(file)
    })
    writer.end()
    

})




module.exports = router
