/*--------------------------------------------------------------------------------------------------*\
    INDEX:
        1. - FILE NOTES
        2. - REQUIRE DEPENDENCIES
        3. - DATABASE CONNECTION
        4. - CONNECTION EVENTS
        5. - MODULE EXPORTS
\*--------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------*\
    1. - FILE NOTES
\*-------------------------------------------------*/



/*-------------------------------------------------*\
    2. - REQUIRE DEPENDENCIES
\*-------------------------------------------------*/
const { databaseconnection } = require('./envConfig');
const mongoose = require('mongoose');


/*-------------------------------------------------*\
    3. - DATABASE CONNECTION
\*-------------------------------------------------*/
mongoose.connect(databaseconnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})


/*-------------------------------------------------*\
    4. - CONNECTION EVENTS
\*-------------------------------------------------*/
// When successfully connected
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + databaseconnection);
})

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
})

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 


/*-------------------------------------------------*\
    4. - MODULE EXPORTS
\*-------------------------------------------------*/
module.exports = mongoose;