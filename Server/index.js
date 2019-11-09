/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - SETUP MIDDLEWARE
        4. - START SERVER
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const { port } = require('./config/envConfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');


/*-------------------------------------------------*\
    3. - SETUP MIDDLEWARE
\*-------------------------------------------------*/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('combined'));

// Setup db connection
require('./config/dbConfig');

// Setup routes
require('./routes')(app);

app.use(history({
    verbose: true
}));

/*-------------------------------------------------*\
    4. - START SERVER
\*-------------------------------------------------*/
let listen = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
        }).on('error', (err) => {
        if(err.errno === 'EADDRINUSE') {
            port++;
            console.log(`----- Port ${port} is busy, trying with port ${port} -----`);
            setTimeout(() => {
                listen(port)
            }, 500);
           } else {
            console.log(err);
        }
    });
}

listen(port);