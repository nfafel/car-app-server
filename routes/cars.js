const express = require('express');
const carsRouter = express.Router();

const cars_controller = require('../controllers/cars');
const verifyJWT_controller = require('../controllers/verifyJWT');

carsRouter.get('/', verifyJWT_controller.verifyJWT, cars_controller.get);

carsRouter.get('/years', cars_controller.getYears);

carsRouter.get('/makes/:year', cars_controller.getMakes);

carsRouter.get('/models/:year/:make', cars_controller.getModels);

carsRouter.post('/', verifyJWT_controller.verifyJWT, cars_controller.post);

carsRouter.put('/:id', verifyJWT_controller.verifyJWT, cars_controller.put);

carsRouter.delete('/:id', verifyJWT_controller.verifyJWT, cars_controller.delete);

module.exports = carsRouter; 
