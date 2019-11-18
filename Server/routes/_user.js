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
    3. - GET CURRENT USER ROUTE
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
    4. - APPROVE USER ROUTE
\*-------------------------------------------------*/
router.post('/approve', function(req, res) {
    user.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { approved: true }},
        { new: true }
    )
    .then((user) => {
        res.status(200).json({
            status: 200,
            message: 'User approved'
        })
    }).catch(err => {
        res.json({
            error: err
        })
    })
});


/*-------------------------------------------------*\
    5. - GET ALL PENDING USERS ROUTE
\*-------------------------------------------------*/
router.get('/pending', function(req, res) {
    user.find({
        approved: false
    })
    .select({
        'password': 0,
         '__v': 0
    })
    .then((user) => {
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
    6. - NEWTORK ADD REQUEST
\*-------------------------------------------------*/
router.post('/network/request', function(req, res) {
    network.findOneAndUpdate (
        { requester: req.body.userA, recipient: req.body.userB },
        { $set: { status: 'pending' } },
        { upsert: true, new: true }
    ).then((doc) => {  
        // console.log(doc._id) 
        Object.entries(req.body).forEach(([key, val]) => {
            user.findOneAndUpdate (
                { _id: val },
                { $push: { network: doc._id }}
            ).then((data) => {
                console.log(data)
            })
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



/*-------------------------------------------------*\
    8. - DENY NETWORK REQUEST
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    8. - GET PENDING NETOWRK REQUESTS
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    9. - GET NETWORK
\*-------------------------------------------------*/




/*-------------------------------------------------*\
    6. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;