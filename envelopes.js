const express = require('express')
const brain = require('./utils/brainEnvelopes')

envelopesRouter = express.Router()

envelopesRouter.param('id', (req,res,next)=>{
    req.params.db = ['userfinal','envelopes']
    next()
})


//get all envelopes
envelopesRouter.get('/', brain.getAllEnvelopes);

//get envelope by id
envelopesRouter.get('/envelope/:id', brain.getEnvelopeById);

//create a new envelope
envelopesRouter.post('/newEnvelope', brain.createEnvelope);

//delete an envelope
envelopesRouter.delete('/deleteEnvelope/:id', brain.deleteEnvelope);

//transfer value between two envelopes if possible
envelopesRouter.patch('/transfer/:fromid/to/:id', brain.transfer);

//add funds to a specific envelope
envelopesRouter.patch('increaseEnvelope/:id', );

//retrieve funds from a specific envelope
envelopesRouter.patch('/decreaseEnvelope/:id', );

module.exports = envelopesRouter





