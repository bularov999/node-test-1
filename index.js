const express = require('express')
const app = express()
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser')
const PORT = 3000
const adapter = require('./services/adapter')
const router = require('./routes/router')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())
app.use('/files', router)
app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})