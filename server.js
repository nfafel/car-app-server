const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphQLServer');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const cars = require('./routes/cars'); // Imports routes for the cars
const repairs = require('./routes/repairs'); // Imports routes for the repairs
const sms = require('./routes/sms'); // Imports routes for twilio messaging
const users = require('./routes/users'); // Imports routes for twilio messaging

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');

var MONGODB;
if (process.env.NODE_ENV == 'test') {
    MONGODB = process.env.MONGODBTEST || "mongodb://localhost:27017";
} else {
    process.env['MONGODB'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/myReactAppDb?retryWrites=true&w=majority"
    MONGODB = process.env.MONGODB || "mongodb://localhost:27017";
}

mongoose.connect(MONGODB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const myReactAppDb = mongoose.connection;
myReactAppDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use('/cars', cars);
app.use('/repairs', repairs);
app.use('/sms', sms);
app.use('/users', users)

app.get('/version', (req, res, next) => {
    res.send( {version: `Current version of Node: ${process.version}`} );
});

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({app});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});  

module.exports = httpServer;