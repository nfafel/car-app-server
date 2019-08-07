const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');

usersRouter.get('/', users_controller.get);

usersRouter.get('/:number/password', users_controller.getPassword);

usersRouter.post('/', users_controller.post);

usersRouter.delete('/:number', users_controller.delete);

module.exports = usersRouter; 