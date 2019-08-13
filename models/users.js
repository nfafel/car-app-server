const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    phoneNumber: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('Users', UsersSchema);