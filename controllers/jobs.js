const createJob = async (req, res) =>{
    res.send('create a job')
}
const getAllJobs = async (req, res) =>{
    res.send('get all jobs')
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