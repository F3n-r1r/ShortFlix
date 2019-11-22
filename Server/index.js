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



/*-------------------------------------------------*\
    ?. - SOCKET IO TESTING
\*-------------------------------------------------*/
let users = []
let messages = []
let index = 0

const http = require('http').Server(app)
const io = require('socket.io')(http);

io.on("connection", socket => {
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    })


    // Connected
    socket.on('newuser', username => {
        //console.log(`${username} has joined`)
        socket.username = username;
        users.push(socket)

        io.emit('userOnline', socket.username);
    })


    socket.on('msg', msg => {
        console.log(socket.username)
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }
        messages.push(message);
        io.emit('msg', message);
        index++;
    })

    
    //Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has disconnected`)
        io.emit('userLeft', socket.username);
        users.splice(users.indexOf(socket), 1);
    })
})

http.listen(3000, () => {
    console.log("listening on %s", 3000);
})



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