/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - VIDEO SCHEMA
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
    3. - USER SCHEMA
\*-------------------------------------------------*/
const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
      type: String, 
      required: true  
    },
    thumbnail: {
        type: String,
        required: true,
        unique: true
    },
    video: {
        type: String, 
        required: true,
        unique: true
    }
})


/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports =  mongoose.model('Video', videoSchema, 'videos');