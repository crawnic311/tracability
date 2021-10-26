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

app.get('/api/error1', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT ||4096

app.listen(port, () => console.log(`Unity ${port}!`))