/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - MESSAGE SCHEMA
        4. - THREAD SCHEMA
        5. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const mongoose = require('mongoose');


/*-------------------------------------------------*\
    3. - MESSAGE SCHEMA
\*-------------------------------------------------*/
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


/*-------------------------------------------------*\
    4. - THREAD SCHEMA
\*-------------------------------------------------*/
const threadSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        default: Date.now
    }
})



/*-------------------------------------------------*\
    5. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  {
    message: mongoose.model('Message', messageSchema, 'messages'),
    thread: mongoose.model('Thread', threadSchema, 'threads'),
}