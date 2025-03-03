const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:[true, 'Name required!']
        },
        email: {
            type: String,
            required: [true, 'Email  required!'],
            trim: true,
            unique: [true, 'Email must be unique!'],
            minLength: [5, 'Email must have 5 characters!'],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password must be provided!'],
            trim: true,
            select: false,
        },
        userRole:{
            type: String
        },
        skills:{
            type: [String]
        },
        experience:{
            type: Number
        },
        earnings:{
            type: Number
        },
        forgotPasswordCode: {
			type: String,
			select: false,
		},
		forgotPasswordCodeValidation: {
			type: Number,
			select: false,
		},
        profileImage:{
            type: String
        }

});

module.exports = mongoose.model('Freelancer', userSchema);