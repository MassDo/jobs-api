const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const createJob = async (req, res) =>{
    const job = await Job.create({...req.body, createdBy:req.user.userId})
    res.status(StatusCodes.OK).json(job)
}
const getAllJobs = async (req, res) =>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}
const getJob = async (req, res) =>{
    const {user: {userId}, params:{id:jobId}} = req
    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job matching this id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json(job)
}
const updateJob = async (req, res) =>{
    res.send('update job')
}
const deleteJob = async (req, res) =>{
    res.send('delete job')
}

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
}
