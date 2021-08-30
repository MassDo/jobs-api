const express = require('express')
const router = express.Router()
// controllers import
const {createJob, getJob, getAllJobs, updateJob, deleteJob} = require('../controllers/jobs')

// extend (/api/v1/jobs)
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router