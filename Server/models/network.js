/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - NETWORK SCHEMA
        4. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const mongoose = require('mongoose');


/*-------------------------------------------------*\
    3. - NETWORK SCHEMA
\*-------------------------------------------------*/
const networkSchema = new mongoose.Schema({ 
    requested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    pending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    accepted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }] 
})




/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  mongoose.model('Network', networkSchema, 'network');