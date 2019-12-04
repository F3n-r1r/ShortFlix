/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - LOGIN USER ROUTE
        4. - REGISTER USER ROUTE
        5. - GET PENDING USERS ROUTE
        6. - APPROVE USER ROUTE
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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const network = require('../models/network');
const { jwtkey } = require('../config/envConfig');


/*-------------------------------------------------*\
    3. - LOGIN USER ROUTE
\*-------------------------------------------------*/
router.post('/login', function(req, res) {
    user.findOne({
        email: req.body.email
    }).then((user) => {
        if(bcrypt.compareSync(req.body.password, user.password) && user.approved) {
            const token = jwt.sign({id: user._id}, jwtkey, { expiresIn: '24h' });
            res.json({
                message: 'success',
                token: token,
                user: user
            })
        } else {
            res.json({
                message: 'error_password'
            })
        }
    }).catch(err => {
        res.json({
            message: 'error_email',
            error: err
        })
    });
});


/*-------------------------------------------------*\
    4. - REGISTER USER ROUTE
\*-------------------------------------------------*/
router.post('/register', function(req, res) {
    user.create({
        email: req.body.email,
        password: req.body.password, // Password is hashed in pre 'save' function in the model
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    }).then(user => {
        console.log(`This user i now registered: ${user}`)
        res.status(201).json({
            status: 201,
            message: 'User succesfully registered',
        })
    }).catch(err => {
        res.status(500).json({
            status: 500,
            message: 'An error occured',
            error: err
        });
    })
});



/*-------------------------------------------------*\
    5. - GET PENDING USERS ROUTE
\*-------------------------------------------------*/
router.get('/pending', function(req, res) {
    console.log(req.body)
    user.find(
        { approved: false }
    )
    .then((user) => {
        res.status(200).json({
            user
        })
    }).catch(err => {
        res.json({
            error: err
        })
    })
});




/*-------------------------------------------------*\
    6. - APPROVE USER ROUTE
\*-------------------------------------------------*/
router.post('/approve', function(req, res) {
    network.create ({})
    .then(network => {
        user.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { approved: true, network: network._id } },
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
    })


});



/*-------------------------------------------------*\
    7. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;