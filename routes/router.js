const express = require('express')
const router = express.Router()
const path = require('path')
const adapter = require('../services/adapter')
const metaType = require('../services/metaTypeDataCreater')
const fileController = require('../controllers/fileController')
const bufferMiddleware = require('../middleware/bufferMiddleware')


router.get('/:filename', (req, res) => fileController.getFileController(req, res))



router.put('/:filename', bufferMiddleware, (req, res) => fileController.putFileController(req, res))





module.exports = router
