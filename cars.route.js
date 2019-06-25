const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('./cars.controller');

repairsRouter.get('/:id', repairs_controller.repairs_getById);

carsRouter.get('/', cars_controller.cars_get);

carsRouter.post('/', cars_controller.cars_post);

carsRouter.put('/:id', cars_controller.cars_put);

carsRouter.delete('/:id', cars_controller.cars_delete);

module.exports = carsRouter;