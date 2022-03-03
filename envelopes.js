const express = require('express')
const usefulMethods = require('./utils')

envelopesRouter = express.Router()

//get all envelopes
envelopesRouter.get('/', (req,res) => {
    res.json({info: 'Node.js, Express and Postgres'})
});

//get envelope by id
envelopesRouter.get('/envelope/:id', usefulMethods.getEnvelopeById);

//create a new envelope
envelopesRouter.post('/newEnvelope',);

//delete an envelope
envelopesRouter.delete('/deleteEnvelope/:id', );

//transfer value between two envelopes if possible
envelopesRouter.patch('/transfer/:fromID/to/:id', );

//add funds to a specific envelope
envelopesRouter.patch('increaseEnvelope/:id', );

//retrieve funds from a specific envelope
envelopesRouter.patch('/decreaseEnvelope/:id', );

//add funds to user's balance
envelopesRouter.put('/insertBalance', );

module.exports = envelopesRouter





