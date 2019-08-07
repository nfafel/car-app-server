const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    phoneNumber: {
        type: Number,
        min: [10000000000, 'Phone number not enough digits!'],
        max: [100000000000, 'Phone number to many digits!'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('Users', UsersSchema);