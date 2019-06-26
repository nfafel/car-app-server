const express = require('express');
const repairsRouter = express.Router();

const repairs_controller = require('./repairs.controller');

repairsRouter.get('/', repairs_controller.repairs_get);

repairsRouter.get('/repairForCar', repairs_controller.repairs_getByCarId)

repairsRouter.post('/', repairs_controller.repairs_post);

repairsRouter.put('/:id', repairs_controller.repairs_put);

repairsRouter.delete('/:id', repairs_controller.repairs_delete);

module.exports = repairsRouter;