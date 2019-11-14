/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - MESSAGE SCHEMA
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
    4. - PRE SAVE FUNCTION
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    5. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  mongoose.model('Message', messageSchema, 'messages');