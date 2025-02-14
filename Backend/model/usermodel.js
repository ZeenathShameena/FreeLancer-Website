const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        title: {
        type: String,
        trim: true,
        minLength: [5, "Project title must be at least 5 characters long"]
    },
    description: {
        type: String,
        required: [true, "Project description is required!"],
        minLength: [10, "Project description must be contain atleast 10 words"]
    },
    requirements: {
        type: String,  
        required: [true, "At least one requirement is needed!"]
    },
    jobCategory: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"], // Restrict values
        required: true
    },
    salary: {
        type: Number,  
        required: [true, "Salary Range needed!"]
    },
    location: {
        type: String,  
        required: [true, "JobLocation needed!"]
    },
    workType: { 
        type: String,
        enum: ["remote", "onsite", "hybrid"], 
        required: [true, "Work Type needed!"]
    },
    companyName: {
        type: String,  
        required: [true, "Company Name needed!"]
    },    
    email: {
        type: String,
        required: [true, 'Contact Email is required!'],
        trim: true,
        minLength: [5, 'Email must have 5 characters!'],
        lowercase: true,
    },
    jobFile: {
        type: String
    },
    dateTime: {
        type: Date
    }
});

module.exports = mongoose.model('Project', userSchema);