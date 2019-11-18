/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - USER SCHEMA
        4. - PRE SAVE FUNCTION
        5. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { saltrounds } = require('../config/envConfig');
const { validateEmail } = require('../utilities/validate');


/*-------------------------------------------------*\
    3. - USER SCHEMA
\*-------------------------------------------------*/
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            validateEmail
        ],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    network: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Network'
    }],
    role: {
        type: String,
        enum: [
            'Student',
            'Professional',
            'Admin'
        ],
        default: 'Student'
    },
    approved: {
        type: String,
        default: false
    }
})


/*-------------------------------------------------*\
    4. - PRE SAVE FUNCTION
\*-------------------------------------------------*/
userSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) {
        return next();
    } else {
        let salt = bcrypt.genSaltSync(parseInt(saltrounds));
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            } else {
                user.password = hash;
                next();
            }
        })
    }
})


/*-------------------------------------------------*\
    5. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  mongoose.model('User', userSchema, 'users');