const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')

const createJob = async (req, res) =>{
    const job = await Job.create({...req.body, createBy:req.user.userId})
    res.status(StatusCodes.OK).json(job)
}
const getAllJobs = async (req, res) =>{
    res.send(req.user)
}
const getJob = async (req, res) =>{
    res.send('get job')
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
