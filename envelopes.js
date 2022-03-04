const { request } = require('express');
const express = require('express')
const brain = require('./utils/brain')

envelopesRouter = express.Router()
envelopesRouter.param('id', (req,res,next)=>{
    req.params.db = ['userfinal','envelopes']
    next()
})


//get all envelopes
envelopesRouter.get('/', (req,res) => {
    res.json({info: 'Node.js, Express and Postgres'})
});

//get envelope by id
envelopesRouter.get('/envelope/:id', brain.getEnvelopeById);

//create a new envelope
envelopesRouter.post('/newEnvelope', brain.createEnvelope);

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





