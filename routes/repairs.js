const express = require('express');
const repairsRouter = express.Router();

const repairs_controller = require('../controllers/repairs');
const verifyJWT_controller = require('../controllers/verifyJWT');

repairsRouter.get('/', verifyJWT_controller.verifyJWT, repairs_controller.get);

repairsRouter.get('/:id/repairsForCar', verifyJWT_controller.verifyJWT, repairs_controller.getByCarId)

repairsRouter.post('/', verifyJWT_controller.verifyJWT, repairs_controller.post);

repairsRouter.put('/:id', verifyJWT_controller.verifyJWT, repairs_controller.put);

repairsRouter.delete('/:id', verifyJWT_controller.verifyJWT, repairs_controller.delete);

module.exports = repairsRouter;