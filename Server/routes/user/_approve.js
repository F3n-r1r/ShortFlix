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
const user = require('../../models/user');


/*-------------------------------------------------*\
    3. - APPROVE USER ROUTE
\*-------------------------------------------------*/
router.post('/', function(req, res) {
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
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;