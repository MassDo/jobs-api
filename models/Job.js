const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'You need to provide a company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, 'You need to provide a position name'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview', 'decline', 'pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
}, {timestamps:true})

module.exports = mongoose.model('Job', jobSchema)