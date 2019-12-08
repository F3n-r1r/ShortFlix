/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - GET ALL USERS ROUTE
        4. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/


/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const network = require('../models/network');
const { jwtkey } = require('../config/envConfig');
const mongoose = require('mongoose');
const multer = require('multer');
var path = require('path')
const fs = require('fs')


/*-------------------------------------------------*\
    3. - GET ALL USERS
\*-------------------------------------------------*/
router.get('/all', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey); 
    user.find({
        _id: { $ne: decodedToken.id },
        approved: "true"
    }).then((users) => {
        res.json({
            users: users
        })
    }).catch(err => {
        res.json({
            err: err
        })
    });
});


/*-------------------------------------------------*\
    4. - GET CURRENT USER ROUTE
\*-------------------------------------------------*/
router.get('/current', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey);            // MAKE UTILITY FUNCTION FOR CHECKING AUTH ???
    user.findOne({
        _id: decodedToken.id
    }).then((user) => {
        res.json({
            user: user
        })
    }).catch(err => {
        res.json({
            error: err
        })
    })
});


/*-------------------------------------------------*\
    5. - GET USER PROFILE
\*-------------------------------------------------*/
router.get('/profile/:id', async (req, res) => {
    let id = req.params.id;

    let profile = await user.findOne(
        { _id: id },
        { password: 0, __v: 0, approved: 0 }
    ).then(data => {
        return data
    }).catch(err => {
        throw(err)
    })

    res.json(profile)
})


/*-------------------------------------------------*\
    5. - MULTER ETC
\*-------------------------------------------------*/
const allowedTypes = ["image/jpeg", "image/png"];
const fileFilter = function(req, file, cb) {

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
}

const MAX_SIZE = 2000000000000;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images')
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

function test() {
    console.log(req.file)
}


/*-------------------------------------------------*\
    6. - EDIT USER PROFILE
\*-------------------------------------------------*/
router.post('/profile/edit/:id', upload.single('file'), fileCheck, async (req, res) => {
    let id = req.params.id;
    console.log(req.body)
    console.log(req.file)

    // let edit = await user.findOneAndUpdate(
    //     { _id: id },
    //     { $set: 
    //         {}
    //     }
    // )
})









/*-------------------------------------------------*\
    6. - NEWTORK ADD REQUEST
\*-------------------------------------------------*/
router.post('/network/request', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey);
    let bodyId = req.body.id;
    //console.log(req.body.id)
    user.find({
        _id: { $in: [
            decodedToken.id,
            req.body.id
        ]}
    }).then((users) => {
        //console.log(users)
        let sortedUsers = users.sort(function(a,b) {
            if(a._id == decodedToken.id) {
                return 1
            }
	        if (b._id == bodyId ) {
                return -1
            }
        });
        network.find({
            _id: { $in: [users[0].network, users[1].network] },
            $or: [
                {requested: { $in: [bodyId, decodedToken.id] }},
                {pending: { $in: [bodyId, decodedToken.id] }},
                {accepted: { $in: [bodyId, decodedToken.id] }}
            ]
        }).then(data => {
            let queries = [{ $addToSet: { pending: [ decodedToken.id ] }}, { $addToSet: { requested: [ bodyId ] }}]
            
            if(data.length == 0) {
                sortedUsers.forEach( function(user, index) {
                    //console.log(queries[index]) 
                    network.findOneAndUpdate(
                        { _id: user.network },
                        queries[index],
                        { upsert: true, new: true }
                    ).then((test) => {
                        //console.log(test)
                    })
                })
            } else {
                console.log('Request,Pending or Accepted is already set between the users')
            }
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })
});






/*-------------------------------------------------*\
    7. - ACCEPT NETWORK REQUEST
\*-------------------------------------------------*/
router.post('/network/accept', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey);
    let bodyId = req.body.id;
    user.find({
        _id: { $in: [
            decodedToken.id,
            bodyId
        ]}
    }).then((users) => {
        let sortedUsers = users.sort(function(a,b) {
            if(a._id == decodedToken.id) {
                return 1
            }
	        if (b._id == bodyId ) {
                return -1
            }
        });
        let queriesPull = [{ $pull: { requested: decodedToken.id }}, { $pull: { pending: bodyId}}]                    
        let queries = [{ $addToSet: { accepted: [ decodedToken.id ] }}, { $addToSet: { accepted: [ bodyId ]}}]
        sortedUsers.forEach( function(user, index) {
            network.findOneAndUpdate(
                { _id: user.network },
                queries[index],
                { upsert: true, new: true }
            ).then((res) => {
                //console.log(queriesPull[index])
                //console.log(user.network)
                network.findOneAndUpdate(
                    { _id: user.network },
                    queriesPull[index],
                    function (err, res){
                        if (err) throw err;
                    },
                    { upsert: true, new: true }
                ).then((res) => {
                    console.log('Pull from set succeded')
                })
            })
        })

        res.status(200).json({
            msg: 'User succescully added to network'
        })
    }).catch((err) => {
        console.log(err)
    })
})


/*-------------------------------------------------*\
    8. - DENY NETWORK REQUEST
\*-------------------------------------------------*/






/*-------------------------------------------------*\
    9. - GET NETWORK
\*-------------------------------------------------*/
router.get('/network/all', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey);
    user.findById({
        _id: decodedToken.id 
    })
    .populate({
        path: 'network',
        populate: {
            path: 'pending accepted'
        }
    })
    .then((user) => {
        res.json({
            user
        })  
    }).catch((err) => {
        res.json({
            err: err
        })
    })
});



/*-------------------------------------------------*\
    6. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;

