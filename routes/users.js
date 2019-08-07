const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');

usersRouter.get('/', users_controller.get);

usersRouter.get('/:number', users_controller.getUser);

usersRouter.put('/:number/changeSubscription', users_controller.changeSubscription)

usersRouter.post('/', users_controller.post);

usersRouter.delete('/:number', users_controller.delete);

module.exports = usersRouter; 