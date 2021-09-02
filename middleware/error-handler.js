const { CustomAPIError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err.code === 11000){
    return res.status(StatusCodes.BAD_REQUEST).json(
      { error:`Duplicate value for ${Object.keys(err.keyValue)} field, please choose other value` })
  }
  if(err.name === "ValidationError"){
    return res.status(StatusCodes.BAD_REQUEST).json(
      { error: err.message })
  }
  if(err.name === "CastError"){
    return res.status(StatusCodes.BAD_REQUEST).json(
      { error: `The id ${err.value} is an incorect format for job id` })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorFromServer:err })
}

module.exports = errorHandlerMiddleware
