const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('../controllers/cars');

carsRouter.get('/years', cars_controller.getYears);

carsRouter.get('/:number', cars_controller.get);

//carsRouter.get('/:id', cars_controller.getById);

carsRouter.get('/makes/:year', cars_controller.getMakes);

carsRouter.get('/models/:year/:make', cars_controller.getModels);

carsRouter.post('/:number', cars_controller.post);

carsRouter.put('/:id/:number', cars_controller.put);

carsRouter.delete('/:id/:number', cars_controller.delete);

module.exports = carsRouter; 
