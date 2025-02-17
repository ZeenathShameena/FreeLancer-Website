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
    salary: {
        type: Number,  
        required: [true, "Salary Range needed!"]
    },
    workType: { 
        type: String,
        enum: ["Remote", "Onsite", "Hybrid"],
        required: [true, "Work Type needed!"]
    },
    dateTime: {
        type: Date
    },
    status: { 
        type: String,
        default: "Open"
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('Project2', userSchema);