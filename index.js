const express = require('express')
const app = express();
const envelopesRouter = require('./envelopes')
const usersRouter = require('./users')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/envelopes', envelopesRouter)
app.use('/users', usersRouter)


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

