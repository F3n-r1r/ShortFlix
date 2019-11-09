/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - REGISTER USER ROUTE FUNCTION
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
const user = require('../../models/user');
const { jwtkey } = require('../../config/envConfig');
const jwt = require('jsonwebtoken');


/*-------------------------------------------------*\
    3. - REGISTER USER ROUTE FUNCTION
\*-------------------------------------------------*/
router.post('/', function(req, res) {
    user.create({
        email: req.body.email,
        password: req.body.password, // Password is hashed in pre 'save' function in the model
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }).then(user => {
        const token = jwt.sign({id: user._id}, jwtkey, { expiresIn: '24h' });
        res.status(201).json({
            status: 201,
            message: 'User succesfully registered',
            token: token,
            user: user
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
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;