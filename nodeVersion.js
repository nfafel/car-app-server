const express = require('express');
const cors = require('cors');
const app = express();

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

// REST endpoints for "car" resource
//GET /cars - returns an array of cars
//GET /cars/3 - returns car with id=3
//POST /cars - adds a new car
//PUT /cars/3 - updates car with id=3
//DELETE /cars/3 - deletes car with id=3

app.get('/version', (req, res, next) => {
    //var carsText = 
    res.send( {version: cars} );
});

app.get('/cars/:id', (req, res, next) => {
    res.send( {version: `Current version of node: ${process.version}`});
});

app.post('/cars', (req, res, next) => {
    res.send( {version: `Current version of node: ${process.version}`});
});

app.put('/cars/:id', (req, res, next) => {
    res.send( {version: `Current version of node: ${process.version}`});
});

app.delete('/cars/:id', (req, res, next) => {
    res.send( {version: `Current version of node: ${process.version}`});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
