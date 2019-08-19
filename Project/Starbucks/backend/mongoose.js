// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// // AWS
// // const url = 'mongodb+srv://root:root@rs0-wetti.mongodb.net/test?retryWrites=true';

// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");


//     client.close();
// });

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://root:root@cmpe202-yph5w.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true, poolSize: 100 }, (err) => {
        if (err) console.log(err);
        else console.log("Connected to MongoDB.")
    });

module.exports = { mongoose };