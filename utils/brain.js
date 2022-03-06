const {pool} = require('../databasePool/pool.js');
const Validator = require('validatorjs')
const buildDate = require('./buildDate')

const getAllEnvelopes = async (req, res) => {
    const results = await pool.query('SELECT * FROM envelopes LIMIT 20');
    res.status(200).json(results.rows)
} 


//get a single envelope by ID
const getEnvelopeById = async (req, res) => {
    const id = parseInt(req.params.id)
    const validation = new Validator({
            id: req.params.id
        }, {
            id: ['required','integer']
        })

    if(validation.passes()){
        const results = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id])
        if(results.rows.length === 0){
            res.status(404).json({error: 'Either invalid or inexisting ID'})
        } else {
            res.status(200).json(results.rows)
        }
    } else {
        res.status(400).json({error: validation.errors.all()})
    }
}

const createEnvelope = async (req, res) => {
    const {envelope_name, date, amount, description, userfinal_id} = req.body;

    const validation = new Validator({
        envelope_name: envelope_name,
        amount: amount,
        description: description,
        userfinal_id: userfinal_id
    }, {
        envelope_name: ['required', 'alpha'],
        amount: ['required', 'integer'],
        description: ['required', 'string'],
        userfinal_id: ['required', 'integer'] 
    })

    if(validation.passes()){
        const results = await pool.query('INSERT INTO envelopes (envelope_name, date, amount, description, userfinal_id) VALUES ($1, $2, $3, $4, $5)',
        [envelope_name, buildDate.buildDate(), parseFloat(amount), description, parseInt(userfinal_id)])

        res.status(201).json(`Create a new envelope named ${envelope_name}`)
    } else {
        res.status(400).json({error: validation.errors.all()})
    }  
}

//delete an envelope by its ID
const deleteEnvelope = async (req,res) => {
    const id = parseInt(req.params.id)
    const validation = new Validator({
            id: req.params.id
        }, {
            id: ['required','integer']
        })

    if(validation.passes()){
        const results = await pool.query('DELETE FROM envelopes WHERE id = $1', [id]);
        if(results.rowCount > 0){
            res.status(200).json(`Deleted envelope with ID ${id}`)
        } else {
            res.status(404).json('Not found')
        }
    } else {
        res.status(400).json({error: validation.errors.all()})
    }
} 

//transfer funds between 2 envelopes
const transfer = async (req, res) => {
    const {fromid, id} = req.params
    const {amount} = req.body;
    const results = await pool.query('SELECT * FROM envelopes WHERE id = $1 UNION SELECT * FROM envelopes WHERE id = $2', [fromid, id])
    const validation = new Validator({
        id: id,
        fromid: fromid,
        amount: amount
    }, {
        id: ['required','integer'],
        fromid: ['required','integer'],
        amount: ['required','numeric']
    })

    if(validation.passes()){
        if(results.rows[0].amount >= amount && results.rows.length > 1){
            const x = await pool.query('update envelopes set amount = amount+$1 where id = $2', [parseFloat(amount), id])
            const y = await pool.query('update envelopes set amount = amount-$1 where id = $2', [parseFloat(amount), fromid])
            res.status(204).json(results.rows)
        } else {
            res.status(404).json('Insufficient funds')
        }
    } else {
        res.status(400).json({error: validation.errors.all()})
    }
}

const increaseEnvelope = async (req, res) => {
    const {id} = req.params
    const {amount} = req.body;
    const results = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id])
    const validation = new Validator({
        id: id,
        amount: amount
    }, {
        id: ['required','integer'],
        fromid: ['required','integer'],
        amount: ['required','integer']
    })
    console.log(amount)
    if(validation.passes()){
        if(results.rows[0].amount >= amount && results.rows.length > 1){
            const x = await pool.query('update envelopes set amount = amount+$1 where id = $2', [parseFloat(amount), id])
            const y = await pool.query('update envelopes set amount = amount-$1 where id = $2', [parseFloat(amount), fromid])
            res.status(200).json(results.rows)
        } else {
            res.status(404).json('Insufficient funds')
        }
    } else {
        res.status(400).json({error: validation.errors.all()})
    }
}


module.exports = {
    getEnvelopeById,
    createEnvelope,
    deleteEnvelope,
    transfer,
    increaseEnvelope,
    getAllEnvelopes
}