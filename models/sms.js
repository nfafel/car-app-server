const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SMSSchema = new Schema({
    phoneNumber: {
        type: Number,
        min: [10000000000, 'Phone number not enough digits!'],
        max: [100000000000, 'Phone number to many digits!'],
        required: true
    }
});

module.exports = mongoose.model('PhoneNumber', SMSSchema);