const express = require('express');
const repairsRouter = express.Router();

const repairs_controller = require('../controllers/repairs');

repairsRouter.get('/:number', repairs_controller.get);

repairsRouter.get('/:id/repairsForCar', repairs_controller.getByCarId)

repairsRouter.post('/:number', repairs_controller.post);

repairsRouter.put('/:id/:number', repairs_controller.put);

repairsRouter.delete('/:id/:number', repairs_controller.delete);

module.exports = repairsRouter;