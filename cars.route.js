const express = require('express');
const router = express.Router();

const cars_controller = require('./cars.controller');


router.get('/cars', cars_controller.car_get);

router.post('/cars', cars_controller.car_post);

router.put('/cars/:id', cars_controller.car_put);

router.delete('/cars/:id', cars_controller.car_delete);

 module.exports = router;