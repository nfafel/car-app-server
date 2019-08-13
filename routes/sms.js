const express = require('express');
const smsRouter = express.Router();

const sms_controller = require('../controllers/sms');

smsRouter.post('/reply', sms_controller.sendResponse);

smsRouter.post('/:number/sendConfirmation', sms_controller.sendConfirmation);

smsRouter.post('/:number/notifyCar', sms_controller.notifyCar);

smsRouter.post('/:number/notifyRepair', sms_controller.notifyRepair);

module.exports = smsRouter;