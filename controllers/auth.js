require('dotenv').config()
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req, res)=>{
    const user = await User.create(req.body)
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token:token})
}

const login = async (req, res)=>{
    const {email, password} = req.body

    if(!email||!password){
        throw new BadRequestError('please send email and user')
    }
    const user = await User.findOne({email:email})
    if(!user){
        throw new UnauthenticatedError('you need to register first !')
    }
    // check if the password is matching
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new UnauthenticatedError('Your password is incorrect')
    }
    const token = user.createJwt()
    res.status(StatusCodes.OK).json({
        user:{name:user.name},
        token:token
    })
}

module.exports = {register, login}