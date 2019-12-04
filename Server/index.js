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
var path = require('path')




/*-------------------------------------------------*\
    3. - SETUP MIDDLEWARE
\*-------------------------------------------------*/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('combined'));


// Allow for folders to be reached in the url (NEEDS AUTH IN THE FUTURE)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


/*-------------------------------------------------*\
    ?. - SOCKET IO TESTING
\*-------------------------------------------------*/

const chat = require('./models/chat');
const http = require('http').Server(app)
const io = require('socket.io')(http);

let connectedUsers = [];

io.on("connection", socket => {

    socket.on('initChat', userId => {
        socket.userId = userId;
        connectedUsers.push(socket)
        // io.emit('userOnline', socket.username);
    })

    socket.on("disconnect", () => {
        let socketIdx = connectedUsers.indexOf(socket)
        if (socketIdx > -1) {
            connectedUsers.splice(socketIdx, 1)
        }
    })


    socket.on('msg', data => {
        let receiverId = data.receiverId;
        let senderId = data.senderId;
        chat.message.create({
            msg: data.msg,
            author: data.senderId,
            thread: data.thread
        }).then((message) => {
            chat.message.findOne({
                author: message.author,
                msg: message.msg,
                thread: message.thread
            }).populate({
                path: 'author',
                select: 'firstname lastname'
            }).then(data => {
                var usersMap = connectedUsers.map(function(elem) {
                    return {
                        userId: elem.userId,
                        socketId: elem.id
                    } 
                  });
                let receiver = usersMap.find(x => x.userId === receiverId)
                let sender = usersMap.find(x => x.userId === senderId)
                if(receiver) {
                    io.to(`${receiver.socketId}`).to(`${sender.socketId}`).emit('msg', data);
                } else {
                   io.to(`${sender.socketId}`).emit('msg', data);
                }
            })
        }).catch((err) => {
            res.json({
                error: err
            })
        })
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