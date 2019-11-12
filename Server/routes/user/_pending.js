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
    3. - GET ALL USERS ROUTE
\*-------------------------------------------------*/
router.get('/', function(req, res) {
    user.find({
        approved: false
    })
    .select({
        'password': 0,
         '__v': 0
    })
    .then((user) => {
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