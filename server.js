const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

const app = express()
app.use(express.json())

let rollbar = new Rollbar({
    accessToken: 'd59dec979dc44d8e9a4a04519edea910',
    captureUncaught: true,
    captureUnhandledRejections: true
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/front/index.html'))
    rollbar.info('html file served successfully!')
})

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, '/front/style.css'))
})


const port = process.env.PORT ||4094

app.listen(port, () => console.log(`Unity ${port}!`))