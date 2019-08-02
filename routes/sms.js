const express = require('express');
const smsRouter = express.Router();

const sms_controller = require('../controllers/sms');

smsRouter.get('/', sms_controller.get);

smsRouter.post('/reply', sms_controller.sendResponse);

smsRouter.post('/sendConfirmation/:number', sms_controller.sendConfirmation);

smsRouter.post('/subscribe/:number', sms_controller.subscribeNumber);

smsRouter.post('/notifyCar/:number', sms_controller.notifyCar);

smsRouter.post('/notifyRepair/:number', sms_controller.notifyRepair);

module.exports = smsRouter;