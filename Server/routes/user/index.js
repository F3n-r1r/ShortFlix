/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - ALL USER RELATED ROUTES
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

/*-------------------------------------------------*\
    3. - ALL USER RELATED ROUTES
\*-------------------------------------------------*/
router.use('/login', require('./_login'));
router.use('/register', require('./_register'));
router.use('/getAuthenticatedUser', require('./_getAuthenticatedUser'));


/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = router;