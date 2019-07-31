const express = require('express');
const repairsRouter = express.Router();

const repairs_controller = require('../controllers/repairs');

repairsRouter.get('/', repairs_controller.get);

repairsRouter.get('/:id/repairsForCar', repairs_controller.getByCarId)

repairsRouter.post('/', repairs_controller.post);

repairsRouter.put('/:id', repairs_controller.put);

repairsRouter.delete('/:id', repairs_controller.delete);

module.exports = repairsRouter;