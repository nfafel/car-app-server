const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarsSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    rating: String
});

/*
let CarsSchema = new Schema({
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
        required: true
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be 0-10'],
        max: [10, 'Rating must be 0-10'],
        required: false
    },
});
*/


// Export the model
module.exports = mongoose.model('Cars', CarsSchema);