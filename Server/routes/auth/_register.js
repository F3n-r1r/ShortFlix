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


/*-------------------------------------------------*\
    3. - REGISTER USER ROUTE
\*-------------------------------------------------*/
router.post('/', function(req, res) {
    user.create({
        email: req.body.email,
        password: req.body.password, // Password is hashed in pre 'save' function in the model
        firstname: req.body.firstname,
        lastname: req.body.lastname
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
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;