const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RepairsSchema = new Schema({
    phoneNumber: {
        type: Number,
        min: [10000000000, 'Phone number not enough digits!'],
        max: [100000000000, 'Phone number to many digits!'],
        required: true
    },
    car_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        min: [0, "Can't have a negative cost"],
        required: true
    },
    progress: {
        type: String,
        required: true
    },
    technician: {
        type: String,
        required: true
    }
});


// Export the model
module.exports = mongoose.model('Repairs', RepairsSchema);