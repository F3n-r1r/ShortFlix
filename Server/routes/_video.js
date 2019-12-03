/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - ????
        4. - 
        7. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/


/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path')

const allowedTypes = ["video/quicktime", "image/jpeg", "image/png"];

/*-------------------------------------------------*\
    3. - FILE FILTER 
\*-------------------------------------------------*/
const fileFilter = function(req, file, cb) {

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
}

/*-------------------------------------------------*\
    4. - UPLOAD SETTINGS
\*-------------------------------------------------*/
const MAX_SIZE = 2000000000000;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype.includes("image")) {
            cb(null, './uploads/images')
        } else if (file.mimetype.includes("video")) {
            cb(null, './uploads/videos')
        }
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})
const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

// CREATE DESTINATION FUNCTION DEPENDING ON IMAGE OR VIDEO


/*-------------------------------------------------*\
    5. - MIDDLEWARE FUNCTION
\*-------------------------------------------------*/
var fileCheck = function (err, req, res, next) {
    if(err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({
            error: "Not the right format type"
        });
        return;
    }

    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({
            error: `Too large. Max size is ${MAX_SIZE/1024}Kb`
        });
        return;
    }
    next()
}



/*-------------------------------------------------*\
    6. - UPLOAD VIDEO
\*-------------------------------------------------*/
router.post('/upload', upload.array('files'), fileCheck, function(req, res) {

    res.json({
       file: req.files,
       test: req.body
    })

})


/*
    NOTES: FOR GETTING DATA
    Send back image url and video url instead of the whole file

*/


/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;