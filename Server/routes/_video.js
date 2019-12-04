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
const video = require('../models/video');
const multer = require('multer');
var path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config/envConfig');

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
    const filesArr = req.files.sort(function(a, b) {
        return a.mimetype > b.mimetype ? 1 : -1;
    })
    video.create({
        user: req.body.creator,
        title: req.body.title,
        description: req.body.description,
        thumbnail: filesArr[0].path,
        video: filesArr[1].path
    }).then(data => {
        video.find({
            user: req.body.creator,
            title: req.body.title,
            description: req.body.description,
            thumbnail: filesArr[0].path,
            video: filesArr[1].path
        }).populate({
            path: 'user',
            select: 'firstname lastname'
        }).then(videos => {
            res.json({
                videos
            })
        })
    }).catch(err => {
        res.json(err)
    })
})


/*-------------------------------------------------*\
    7. - GET PERSONAL VIDEOS
\*-------------------------------------------------*/
router.get('/myVideos', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey).id
    video.find({
        user: decodedToken
    }).populate({
        path: 'user',
        select: 'firstname lastname'
    }).then(videos => {
        res.json({
            videos
        })
    }).catch(err => {
        res.json(err);
    })
})





router.get('/playVideo/:id', function(req, res) { 
    const path = `uploads/videos/${req.params.id}`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
  
      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
      }
      
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
  
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
});




/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;