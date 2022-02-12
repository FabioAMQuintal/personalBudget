const express = require('express')
const app = express();

const PORT = process.env.PORT || 4001;

const envelopesRouter = require('./envelopes')
app.use('/envelopes', envelopesRouter)


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)

})

