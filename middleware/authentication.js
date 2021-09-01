// vérifier le JWT 
    // si ok renvoyer l'id user et son name dans req.user
        // 
        // cloturer avec next
        
    // si pas ok renvoyer error ? mais laquelle
// utiliser
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    // check if token exists
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No JWT provide')
    }
    // check if token is valid
    const token = authHeader.split(' ')[1] // get rid of Bearer str
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        next()        
    } catch (error) {
        throw new UnauthenticatedError('JWT invalid')
    }
}

module.exports = authMiddleware