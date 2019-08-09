const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RepairsSchema = new Schema({
    phoneNumber: {
        type: String,
        minlength: 11,
        maxlength: 11,
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