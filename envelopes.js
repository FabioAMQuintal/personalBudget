const express = require('express')
const {createEnvelope, getEnvelopeById, deleteEnvelope} = require('./utils')

const envelope = [];

envelopesRouter = express.Router()

//get all envelopes
envelopesRouter.get('/', (req, res, next) => {
    res.send(envelope)
})

//get envelope by id
envelopesRouter.get('/:id', (req, res, next) => {
    const id = getEnvelopeById(req.params.id, envelope)
    if(id){
        res.status(200).send(id)
    } else {
        res.status(404).send()
    }
});

//create a new envelope
envelopesRouter.post('/', (req, res, next) => {
    const newEnvelope = createEnvelope(req.query)
    if(newEnvelope){
        envelope.push(newEnvelope)
        res.status(201).send(newEnvelope)
    } else {
        res.status(400).send()

    }
})

//delete an envelope
envelopesRouter.delete('/:id', (req, res, next) => {
    const copy = envelope[req.params.id]
    const deleted = deleteEnvelope(req.params.id, envelope)
    if(deleted != -1){
        envelope.splice(deleted, 1)
        res.send(copy)
    } else {
        res.status(404).send('Not found')
    }
})


module.exports = envelopesRouter





