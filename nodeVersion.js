const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

process.env['MONGODB'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/test?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB || "mongodb://localhost:27017";

MongoClient.connect(MONGODB, { useNewUrlParser: true }, function (err, client) {
    if(err) {
        console.log(err);
        throw err;
    }

    var myReactAppDb = client.db('myReactAppDb');
    
    app.get('/cars', (req, res, next) => {
        myReactAppDb.collection('cars').find().toArray( (err, results) => {
            res.send({cars: results} );
        });
    });

    app.post('/cars', (req, res, next) => {
        var newCar;
        if (Object.values(req.query).length >= 1) {
            newCar = req.query;
        } else {
            newCar = req.body;
        }
        
        myReactAppDb.collection('cars').insertOne(newCar, (err, result) => {
            if(err) {
              console.log(err);
            }
      
            myReactAppDb.collection('cars').find().toArray( (err, results) => {
                res.send({cars: results} );
            });
        });
    });

    app.put('/cars/:id', (req, res, next) => {
        var carUpdates;
        if (Object.values(req.query).length >= 1) {
            carUpdates = req.query;
        } else {
            carUpdates = req.body;
        }
    
        myReactAppDb.collection("cars").updateOne({_id: ObjectId(req.params.id)}, {'$set':{'make': carUpdates.make, 'model': carUpdates.model, 'year': carUpdates.year, 'rating': carUpdates.rating}}, (err, result) => {
            if(err) {
                throw err;
            }

            myReactAppDb.collection('cars').find().toArray( (err, results) => {
                res.send({cars: results} );
            });
        });
    });

    app.delete('/cars/:id', (req, res, next) => {
        
        myReactAppDb.collection('cars').deleteOne({_id : ObjectId(req.params.id)}, (err, result) => {
            if(err) {
              throw err;
            }

            myReactAppDb.collection('cars').find().toArray( (err, results) => {
                res.send({cars: results} );
            });
          });
     });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });  
  
});

app.get('/version', (req, res, next) => {
    res.send( {version: `Current version of Node: ${process.version}`} );
});

