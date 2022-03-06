const {pool} = require('../databasePool/pool.js');
const Validator = require('validatorjs')


//create a new user
const createUser = async (req, res) => {
    const {email, first_name, last_name} = req.body;
    const validation = new Validator({
        email: email,
        first_name: first_name,
        last_name: last_name
    },{
        email: ['required', 'email'],
        first_name: ['required', 'alpha'],
        last_name: ['required', 'alpha']
    })

    if(validation.passes()){
        try{
            const results = await pool.query('INSERT INTO userfinal (email, first_name, last_name) VALUES ($1, $2, $3)',
            [email, first_name, last_name])
            res.status(201).json(`Create a new user with email ${email}`)
        }catch(error){
            res.status(400).json({error: error.detail})
        }
    } else {
        res.status(400).json({error: validation.errors.all()})
    }
}

//add funds to user's balance
const addFundsUser = async (req, res) => {
    const {id, amount} = req.body;
    const validation = new Validator({
        id: id,
        amount: amount
    },{
        id: ['required','integer'],
        amount: ['required','numeric']
    })
    if(validation.passes()){
        try{
            const results = await pool.query('UPDATE userfinal SET balance = balance+$1 WHERE ID = $2', [parseFloat(amount), id])
            res.status(204).json(`Added $ ${amount} to ID ${id}`)
        }catch(error){
            res.status(400).json({error: validation.errors.all()})
        }
    }
}


module.exports = {
    createUser,
    addFundsUser
}