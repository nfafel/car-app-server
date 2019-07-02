const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('./cars.controller');

carsRouter.get('/years', cars_controller.cars_getYears);

carsRouter.get('/', cars_controller.cars_get);

carsRouter.get('/:id', cars_controller.cars_getById);

carsRouter.get('/makes/:year', cars_controller.cars_getMakes);

carsRouter.get('/models/:year/:make', cars_controller.cars_getModels);

carsRouter.get('/', cars_controller.cars_get);

carsRouter.post('/', cars_controller.cars_post);

carsRouter.put('/:id', cars_controller.cars_put);

carsRouter.delete('/:id/repairs', cars_controller.cars_deleteRepairs)

carsRouter.delete('/:id', cars_controller.cars_delete);

module.exports = carsRouter; 
