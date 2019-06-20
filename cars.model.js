const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarsSchema = new Schema({
    make: {type: String, required: false},
    model: {type: Number, required: false},
    year: {type: String, required: false},
    rating: {type: Number, required: false}
});


// Export the model
module.exports = mongoose.model('Cars', CarsSchema);