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


/*-------------------------------------------------*\
    3. - CREATE NEW THREAD / OR GET MESSAGES OF THREAD
\*-------------------------------------------------*/
// router.post('/thread', function(req, res) {
//     chat.thread.create({
//         users: [
//             jwt.verify(req.headers['authorization'], jwtkey).id,
//             req.body.id
//         ]
//     }).then(() => {
//         res.status(201).json({
//             message: 'Thread created',
//         })
//     }).catch(err => {
//         res.json({
//             error: err
//         })
//     })      
// });

// router.post('/thread', function(req, res) {
//     chat.thread.count({
//         users: [
//             jwt.verify(req.headers['authorization'], jwtkey).id,
//             req.body.id
//         ]
//     }).then((count) => {
//         if(count === 0) {
//             chat.thread.create({
//                 users: [
//                     jwt.verify(req.headers['authorization'], jwtkey).id,
//                     req.body.id
//                 ]
//             }).then(() => {
//                 res.status(201).json({
//                     message: 'Thread created',
//                 })
//             }).catch(err => {
//                 res.json({
//                     error: err
//                 })
//             })
//         } else {       
//             chat.message.find({
//                 thread: thread._id
//             }).then((messages) => {
//                 res.json({
//                     messages
//                 })
//             }).catch((err) => {
//                 res.json({
//                     error: err
//                 })
//             })
//         }
//     })

// });













/*-------------------------------------------------*\
    6. - POST NEW MESSAGE
\*-------------------------------------------------*/
router.post('/message', function(req, res) {
    chat.message.create({
        text: req.body.text,
        author: jwt.verify(req.headers['authorization'], jwtkey).id,
        thread: req.body.threadId
    }).then(() => {

    }).catch((err) => {
        res.json({
            error: err
        })
    })
});




/*-------------------------------------------------*\
    4. - GET SPECIFIC THREAD
\*-------------------------------------------------*/
// router.get('/thread', function(req, res) {
//     chat.thread.findOne({
//         _id: req.body.id
//     }).then((thread) => {
//         res.json({
//             thread
//         })
//     })
// });


/*-------------------------------------------------*\
    5. - GET ALL THREADS (Specific to the user)
\*-------------------------------------------------*/
router.get('/threads', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey); 
    chat.thread.find({
        users: decodedToken.id
    }).then((threads) => {
        let userIdArr = [];
        for(let i = 0; i < threads.length; i++) { 
            for(let j = 0; j < threads[i].users.length; j++) {
                if(threads[i].users[j] != decodedToken.id) {
                    userIdArr.push(threads[i].users[j])
                }   
            }  
        }
        user.find({
            _id: { $in: [
                userIdArr
            ]}
        }).then((test) => {
            res.json({
                test
            })
        })
    })
});



/*
    NOTE:
    On start new thread search users array for the two users in question,
    if found then dont start a new thread but return what it found.
    else start new thread.
*/
router.post('/open_thread', function(req, res) {
    chat.thread.find({
        users: [
            jwt.verify(req.headers['authorization'], jwtkey).id,
            req.body.id
        ]
    }).then((data) => {     
        if(!data.length) {
            chat.thread.create({
                users: [
                    jwt.verify(req.headers['authorization'], jwtkey).id,
                    req.body.id
                ]
            }).then((thread) => {
                 res.json({
                     thread
                 })
            }).catch((err) => {
                res.json({
                    err
                })
            })
        } else {
            //console.log(data)
            chat.message.find({
                thread: data._id
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