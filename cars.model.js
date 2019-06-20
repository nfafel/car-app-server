const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarsSchema = new Schema({
    make: String,
    model: String,
    year: String,
    rating: String
});


// Export the model
module.exports = mongoose.model('Cars', CarsSchema);