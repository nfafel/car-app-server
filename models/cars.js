const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarsSchema = new Schema({
    phoneNumber: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: [1941, 'Too Old'],
        max: [new Date().getFullYear(), 'Too New'],
        required: true
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be 0-10'],
        max: [10, 'Rating must be 0-10'],
        required: false
    },
});

// Export the model
module.exports = mongoose.model('Cars', CarsSchema);