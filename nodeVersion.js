const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

const PORT = process.env.PORT || 5000;

MongoClient.connect("mongodb://localhost:27017/MyDb", { useNewUrlParser: true }, function (err, db) {
    var myReactAppDb = db.db('myReactAppDb');
    if(err) throw err;

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });     
});

// "in-memory" data
const cars = [
    {
        id: 1,
        make: 'Ford',
        model: 'Explorer',
        year: '2015',
        rating: 4,
    },
    {
        id: 2,
        make: 'Ford',
        model: 'Edge',
        year: '2015',
        rating: 5,
    }
];

var nextId = 3;

function getCarIndexById(id) {
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].id == id) {
            return i;
        }
    }
    return 'No car with corresponding ID.'
}

app.get('/version', (req, res, next) => {
    res.send( {version: `Current version of Node: ${process.version}`} );
});

app.get('/cars', (req, res, next) => {
    res.send( {cars: cars} );
});

app.get('/cars/:id', (req, res, next) => {
    const carIndex = getCarIndexById(req.params.id);
    const car = cars[carIndex];
    res.send( {cars: car});
});

app.post('/cars', (req, res, next) => {
    var newCar;
    if (Object.values(req.query).length >= 1) {
        newCar = req.query;
    } else {
        newCar = req.body;
    }
    newCar.id = nextId;
    nextId++;
    myReactAppDb.collection('cars').save(newCar, (err, result) => {
        if(err) {
          console.log(err);
        }
  
        res.send('name added successfully');
    });
    //cars.push(newCar);
    res.send( {cars: cars} );
});

app.put('/cars/:id', (req, res, next) => {
    var carIndexToUpdate = getCarIndexById(req.params.id);
    var carUpdates;
    if (Object.values(req.query).length >= 1) {
        carUpdates = req.query;
    } else {
        carUpdates = req.body;
    }
    for (var property in carUpdates) {
        cars[carIndexToUpdate][property] = carUpdates[property];
    }
    res.send( {cars: cars} );
});

app.delete('/cars/:id', (req, res, next) => {
    var carIndexToDelete = getCarIndexById(req.params.id);
    cars.splice(carIndexToDelete, 1);
    res.send( {cars: cars});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
