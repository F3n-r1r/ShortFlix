/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - AUTHORIZE USER FUNCTION
        4. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../../config/envConfig');


/*-------------------------------------------------*\
    3. - AUTHORIZE USER FUNCTION
\*-------------------------------------------------*/
function authorize(req, res, next) {
    if(!req.header('authorization')) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized. Missing Auth Header'
        })
    } else {
        let token = jwt.verify(req.headers['authorization'], jwtkey);
        if(!token) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized. Auth Header Invalid'
            })
        } else {
            req.userId = token.sub;
            next();
        }
    }
};


/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = {
    authorize
};