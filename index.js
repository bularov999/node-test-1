const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()


const PORT = process.env.PORT || 3000
const router = require('./routes/router')
app.use('/files', router)

bootstrap()
async function bootstrap() {
    try {
        await mongoose.connect(
            process.env.DB_URL,
            { useUnifiedTopology: true, useNewUrlParser: true },
            function (err) {
                if (err) return new Error(err)
                app.listen(PORT, () => {
                    console.log(`port is running on ${PORT}`)
                })
            }
        )
    }
    catch (e) {
        throw new Error(e)
    }
}