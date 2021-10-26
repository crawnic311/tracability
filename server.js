const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

const app = express()
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/front/index.html'))
    rollbar.info('html file served successfully')
})


const port = process.env.PORT ||4094

app.listen(port, () => console.log(`Unity ${port}!`))