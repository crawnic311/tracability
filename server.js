const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

const app = express()
app.use(express.json())

let rollbar = new Rollbar({
    accessToken: 'b8a1c09357204f77ada9f349295e92d0',
    captureUncaught: true,
    captureUnhandledRejections: true
})

rollbar.log('Hello world!')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/front/index.html'))
    rollbar.info('html file served successfully!')
})

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, '/front/style.css'))
})



app.post('/api/error1', (req, res) => {
    let {error1} = req.body

    if (error1 === 'Water') {
        rollbar.log('Water is vital')
        res.status(200).send(error1)
    } else {
        rollbar.critical('We are out of water')
        res.status(400).send('There\'s no more water')
    }

})



app.use(rollbar.errorHandler())

const port = process.env.PORT ||4096

app.listen(port, () => console.log(`Unity ${port}!`))