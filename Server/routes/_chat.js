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
    3. - CREATE NEW THREAD
\*-------------------------------------------------*/
router.post('/new_thread', function(req, res) {
    chat.thread.count({
        users: [
            jwt.verify(req.headers['authorization'], jwtkey).id,
            req.body.id
        ]
    }).then((count) => {
        if(count === 0) {
            chat.thread.create({
                users: [
                    jwt.verify(req.headers['authorization'], jwtkey).id,
                    req.body.id
                ]
            }).then(() => {
                res.status(201).json({
                    message: 'Thread created',
                })
            }).catch(err => {
                res.json({
                    error: err
                })
            })
        } else {
            res.json({
                message: 'Thread already exists'
            })
        }
    })

});


//CLIENT SIDE METHOD USED LIKE ON THE ADMIN PAGE WITH APPROVING USERS
// approveUser: function(userId) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             id: userId
//         }
//         axios({method: 'POST', url: 'http://localhost:8000/api/chat/new_thread', data: data })
//         .then(resp => {
//             console.log(resp)
//             resolve(resp);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }



/*-------------------------------------------------*\
    4. - GET SPECIFIC THREAD
\*-------------------------------------------------*/
router.get('/thread', function(req, res) {
    chat.thread.findOne({
        _id: req.body.id
    }).then((thread) => {
        res.json({
            thread
        })
    })
});


/*-------------------------------------------------*\
    5. - GET ALL THREADS (Specific to the user)
\*-------------------------------------------------*/
router.get('/threads', function(req, res) {
    let decodedToken = jwt.verify(req.headers['authorization'], jwtkey); 
    chat.thread.find({
        'users._id': decodedToken.id
    }).then((threads) => {
        res.json({
            threads
        })
    })
});


/*-------------------------------------------------*\
    6. - POST NEW MESSAGE
\*-------------------------------------------------*/
router.post('/message', function(req, res) {

});


/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;