const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');

usersRouter.get('/login', users_controller.loginUser);

usersRouter.get('/availability', users_controller.checkAvailability);

usersRouter.put('/changeSubscription', users_controller.changeSubscription)

usersRouter.post('/', users_controller.post);

usersRouter.delete('/', users_controller.delete);

module.exports = usersRouter; 