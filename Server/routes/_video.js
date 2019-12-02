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


/*-------------------------------------------------*\
    4. - FILE FILTER ()
\*-------------------------------------------------*/
const fileFilter = function(req, file, cb) {
    const allowedTypes = ["video/quicktime"];
    file.size

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
}

/*-------------------------------------------------*\
    3. - UPLOAD SETTINGS
\*-------------------------------------------------*/
const MAX_SIZE = 2000000000000;
const upload = multer({
    dest: './uploads/videos',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})




/*-------------------------------------------------*\
    5. - MIDDLEWARE FUNCTION
\*-------------------------------------------------*/
var fileCheck = function (err, req, res, next) {
    if(err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({
            error: "Only videos are allowed"
        });
        return;
    }

    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({
            error: `Too large. Max size is ${MAX_SIZE/1000}Kb`
        });
        return;
    }
    next()
}



router.post('/upload', upload.single('file'), fileCheck, function(req, res) {
    res.json({
       file: req.file
    })

})



/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;