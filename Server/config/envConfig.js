/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
require('dotenv').config();


/*-------------------------------------------------*\
    3. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = {
    databaseconnection: process.env.DATABASE_CONNECTION,
    port: process.env.PORT,
    saltrounds: process.env.SALT_ROUNDS,
    jwtkey: process.env.JWT_KEY
};