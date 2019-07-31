const express = require('express');
const smsRouter = express.Router();

const sms_controller = require('../controllers/sms');

smsRouter.post('/:number', sms_controller.sendMessage)

module.exports = smsRouter;