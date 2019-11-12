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
router.get('/', function(req, res) {
    user.findOne({
        _id: req.body._id
    })
    .then((users) => {
        user.approved_user.create()
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
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;