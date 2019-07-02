const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const cars = require('./cars.route'); // Imports routes for the cars
const repairs = require('./repairs.route'); // Imports routes for the repairs
const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
console.log(process.env.MONGODB);
//process.env['MONGODB'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/myReactAppDb?retryWrites=true&w=majority";
const MONGODB = process.env.MONGODB || "mongodb://localhost:27017";

mongoose.connect(MONGODB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const myReactAppDb = mongoose.connection;
myReactAppDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use('/cars', cars);
app.use('/repairs', repairs);

app.use('/api', proxy({ 
    target: 'https://www.carqueryapi.com',
    changeOrigin: true
})); //Funnel car year, make, and model requests to https://www.carqueryapi.com

app.get('/version', (req, res, next) => {
    res.send( {version: `Current version of Node: ${process.version}`} );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});  

