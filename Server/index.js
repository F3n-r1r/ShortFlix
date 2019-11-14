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

// Socket IO
//const server = require('http').Server(app)
// const io = require('socket.io')(server);

// Setup db connection
require('./config/dbConfig');

// Setup routes
require('./routes/index')(app);

app.use(history({
    verbose: true
}));


/*-------------------------------------------------*\
    4. - START SERVER
\*-------------------------------------------------*/
let portNum = process.env.PORT || port;
let listen = (portNum) => {
    app.listen(portNum, () => {
        console.log(`Server is running on port: ${portNum}`);
        }).on('error', (err) => {
        if(err.errno === 'EADDRINUSE') {
            portNum++;
            console.log(`----- Port ${portNum} is busy, trying with port ${portNum} -----`);
            setTimeout(() => {
                listen(portNum)
            }, 500);
           } else {
            console.log(err);
        }
    });
}

listen(portNum);