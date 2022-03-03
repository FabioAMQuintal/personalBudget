const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'fabio',
    port: 5432,
})

const getEnvelopeById = (request, response) => {
    
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).json({error: 'Invalid Request. Must be an integer'})
            throw error
        }
        if(results.rows.length === 0){
            response.status(404).json({error: 'Either invalid or inexisting ID'})
        } else {
            response.status(200).json(results.rows)
        }
  })
}


module.exports = {
    getEnvelopeById
}