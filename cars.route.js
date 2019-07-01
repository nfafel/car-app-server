const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('./cars.controller');

carsRouter.get('/', cars_controller.cars_get);

//carsRouter.get('/getAllYears', cars_controller.cars_getAllYears);

carsRouter.get('/:id', cars_controller.cars_getById);

carsRouter.post('/', cars_controller.cars_post);

carsRouter.put('/:id', cars_controller.cars_put);

carsRouter.delete('/:id', cars_controller.cars_delete);

module.exports = carsRouter;
