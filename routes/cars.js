const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('../controllers/cars');
const carqueryapi_controller = require('../controllers/carqueryapi');

carsRouter.get('/years', carqueryapi_controller.getYears);

carsRouter.get('/:number', cars_controller.get);

carsRouter.get('/makes/:year', carqueryapi_controller.getMakes);

carsRouter.get('/models/:year/:make', carqueryapi_controller.getModels);

carsRouter.post('/', cars_controller.post);

carsRouter.put('/:id', cars_controller.put);

carsRouter.delete('/:id', cars_controller.delete);

module.exports = carsRouter; 
