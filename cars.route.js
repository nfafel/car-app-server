const express = require('express');
const router = express.Router();

const cars_controller = require('./cars.controller');


router.get('/', cars_controller.cars_get);

router.post('/', cars_controller.cars_post);

router.put('/:id', cars_controller.cars_put);

router.delete('/:id', cars_controller.cars_delete);

module.exports = router;