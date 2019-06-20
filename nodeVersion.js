const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cars = require('./cars.route'); // Imports routes for the products

//var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const app = express();

app.use('/cars', cars);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

process.env['MONGODB'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/test?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB || "mongodb://localhost:27017";

mongoose.connect(MONGODB);
mongoose.Promise = global.Promise;
const myReactAppDb = mongoose.connection;
myReactAppDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});  

app.get('/version', (req, res, next) => {
    res.send( {version: `Current version of Node: ${process.version}`} );
});

