const express = require('express')
const brain = require('./utils/brainUsers')

usersRouter = express.Router()

usersRouter.post('/createUser', brain.createUser)
usersRouter.patch('/insertFunds', brain.addFundsUser);


module.exports = usersRouter