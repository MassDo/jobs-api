require('dotenv').config()
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')


const register = async (req, res)=>{
    const user = await User.create(req.body)
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token:token})
}

const login = async (req, res)=>{
    res.send('login route')
}

module.exports = {register, login}