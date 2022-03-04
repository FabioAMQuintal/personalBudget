const {pool} = require('../databasePool/pool.js');
const Validator = require('validatorjs')
const buildDate = require('./buildDate')

//get a single envelope by ID
const getEnvelopeById = async (req, res) => {
    
    const id = parseInt(req.params.id)
    const validation = new Validator({
            id: req.params.id
        }, {
            id: ['required','integer']
        })

    if(validation.passes()){

        pool.query('SELECT * FROM envelopes WHERE id = $1', [id]).
        then(results => {    
            if(results.rows.length === 0){
                res.status(404).json({error: 'Either invalid or inexisting ID'})
            } else {
                res.status(200).json(results.rows)
            }
        }).
        catch(err => console.log('Error execuring the query', err.stack))
      
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
        pool.query('INSERT INTO envelopes (envelope_name, date, amount, description, userfinal_id) VALUES ($1, $2, $3, $4, $5)',
        [envelope_name, buildDate.buildDate(), parseFloat(amount), description, parseInt(userfinal_id)])
        .then(results => {
            console.log(results)
            res.status(201).json(`Create a new envelope named ${envelope_name}`)
        })
        .catch(err => {
            (err => console.log('Error execuring the query', err.stack))
        })
    } else {
        res.status(400).json({error: validation.errors.all()})
    }  
}

module.exports = {
    getEnvelopeById,
    createEnvelope
}