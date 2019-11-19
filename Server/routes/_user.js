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
        let sortedUsers = users.sort(function(a,b) {
            if(a._id == decodedToken.id) {
                return 1
            }
	        if (b._id == bodyId ) {
                return -1
            }
        });
        let queries = [{ $addToSet: { pending: [ decodedToken.id ] }}, { $addToSet: { requested: [ bodyId ] }}]
        sortedUsers.forEach( function(user, index) {
            //console.log(queries[index])
            network.findOneAndUpdate(
                { _id: user.network },
                queries[index],
                { upsert: true, new: true }
            ).then((test) => {
                //console.log('test1')
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

