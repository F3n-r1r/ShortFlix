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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const user = require('../../models/user');
const { jwtkey } = require('../../config/envConfig');


/*-------------------------------------------------*\
    3. - LOGIN USER ROUTE
\*-------------------------------------------------*/
router.post('/', function(req, res) {
    user.findOne({
        email: req.body.email
    }).then((user) => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
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
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;