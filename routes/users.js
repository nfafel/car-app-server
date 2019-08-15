const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');
const verifyJWT_controller = require('../controllers/verifyJWT');

usersRouter.get('/:phoneNumber/availability', users_controller.checkAvailability);

usersRouter.put('/changeSubscription', verifyJWT_controller.verifyJWT, users_controller.changeSubscription)

usersRouter.post('/', users_controller.post);

usersRouter.post('/login', users_controller.loginUser);

usersRouter.delete('/', users_controller.delete);

module.exports = usersRouter; 