/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - CREATE NEW THREAD
        4. - GET SPECIFIC THREAD
        5. - GET ALL THREADS
        6. - POST NEW MESSAGE
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
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const chat = require('../models/chat');
const { jwtkey } = require('../config/envConfig');





router.get('/threads', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey).id
    chat.thread.find({
        users: decodedToken
    }).populate({
        path: 'users',
        match: { _id: { $ne: decodedToken }},
        select: 'firstname lastname'
    }).then((threads) => {
        if(threads) {
            chat.message.find({
                thread: threads[0]._id
            }).populate({
                path: 'author',
                select: 'firstname lastname'
            }).then(messages => {
                let data = {
                    threads,
                    messages
                }
                res.json(data)
            }) 
        }
    })
});


router.post('/threadMessages', function(req, res) {
    chat.message.find({
        thread: req.body.id
    }).populate({
        path: 'author',
        select: 'firstname lastname'
    }).then(messages => {
        res.json({
            messages
        })
    }).catch(err => {
        //console.log(err)
    })
})


/*
    NOTE:
    On start new thread search users array for the two users in question,
    if found then dont start a new thread but return what it found.
    else start new thread.
*/
router.post('/openThread', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey).id
    chat.thread.find({
        users: [
            decodedToken,
            req.body.id
        ]
    }).then((data) => {     
        if(!data.length) {
            chat.thread.create({
                users: [
                    jwt.verify(req.headers['authorization'], jwtkey).id,
                    req.body.id
                ]
            }).then((result) => {
                chat.thread.find({
                    _id: result._id
                }).populate({
                    path: 'users',
                    match: { _id: { $ne: decodedToken }},
                    select: 'firstname lastname'
                }).then((thread) => {
                    res.json({
                        thread
                    })
                }).catch((err) => {
                    res.json({
                        err
                    })
                })
            }).catch((err) => {
                res.json({
                    err
                })
            })
        } else {
            chat.message.find({
                thread: data[0]._id
            }).then((messages) => {
                res.json({
                    messages: messages,
                    thread: data
                })
            }).catch((err) => {
                res.json({
                    err
                })
            })
        }
    }).catch((err) => {
        res.json({
            err
        })
    })     
});



/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;