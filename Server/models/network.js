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
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    status: {
      type: String,
      enums: [
          'pending',
          'accepted'
      ]
    }
})




/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  mongoose.model('Network', networkSchema, 'network');