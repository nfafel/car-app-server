const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

const PORT = process.env.PORT || 5000;

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

// REST endpoints for "car" resource
//GET /cars - returns an array of cars
//GET /cars/3 - returns car with id=3
//POST /cars - adds a new car
//PUT /cars/3 - updates car with id=3
//DELETE /cars/3 - deletes car with id=3

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
    var newCar = req.query;
    newCar.id = nextId;
    nextId++;
    cars.push(newCar);
    res.send( {cars: cars});
});

app.put('/cars/:id', (req, res, next) => {
    var carIndexToUpdate = getCarIndexById(req.params.id);
    var carUpdates = req.query;
    for (var property in carUpdates) {
        cars[carIndexToUpdate][property] = carUpdates[property];
    }
    var updatedCar = cars[carIndexToUpdate];
    res.send( {cars: updatedCar} );
});

app.delete('/cars/:id', (req, res, next) => {
    var carIndexToDelete = getCarIndexById(req.params.id);
    cars.splice(carIndexToDelete);
    res.send( {cars: cars});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
