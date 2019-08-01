const express = require('express');
const smsRouter = express.Router();

const sms_controller = require('../controllers/sms');

smsRouter.post('/reply', sms_controller.sendResponse);

smsRouter.post('/sendConfirmation/:number', sms_controller.sendConfirmation);

smsRouter.post('/subscribe/:number', sms_controller.subscribeNumber)

module.exports = smsRouter;