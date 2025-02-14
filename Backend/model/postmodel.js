const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        jobTitle: {
        type: String
        },
        jobDescription: {
            type: String
        },
        jobBudget:{
            type: Number
        }
});

module.exports = mongoose.model('Posted_Collection', userSchema);