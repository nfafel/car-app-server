const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('../controllers/cars');

carsRouter.get('/', cars_controller.get);

carsRouter.get('/years', cars_controller.getYears);

carsRouter.get('/makes/:year', cars_controller.getMakes);

carsRouter.get('/models/:year/:make', cars_controller.getModels);

carsRouter.post('/', cars_controller.post);

carsRouter.put('/:id', cars_controller.put);

carsRouter.delete('/:id', cars_controller.delete);

module.exports = carsRouter; 
