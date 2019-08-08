const Cars = require('../models/cars');
const Repairs = require('../models/repairs');
const carInfo = require('../carqueryapiFunctions')

exports.get = async(req, res) => {
    try {
        const result = await Cars.find({phoneNumber: req.params.number});
        res.send({cars: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting cars data"})
    }
}

exports.post = async(req, res) => {
    var newCar;
    if (Object.values(req.query).length >= 1) {
        newCar = new Cars({
            phoneNumber: req.query.phoneNumber,
            make: req.query.make,
            model: req.query.model,
            year: req.query.year,
            rating: req.query.rating
        })
    } else {
        newCar = new Cars({
            phoneNumber: req.body.phoneNumber,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            rating: req.body.rating
        })
    }

    try {
        newCar.save();
        res.send({car: newCar})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error posting car data"})
    }
}

exports.put = async(req, res) => {
    var carUpdates;
    if (Object.values(req.query).length >= 1) {
        carUpdates = req.query;
    } else {
        carUpdates = req.body;
    }

    try {
        const result = await Cars.findByIdAndUpdate(req.params.id, {'$set': carUpdates}, { runValidators: true, new: true });
        res.send({car: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating car data"})
    }
}

exports.delete = async(req, res) => {
    try {
        await Repairs.deleteMany( {car_id: req.params.id} );
        await Cars.findByIdAndRemove(req.params.id);
        res.send( {carId: req.params.id} );
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error deleting car data"})
    }
}

exports.getYears = async(req, res) => {
    try{
        const yearInfo = await carInfo.getYears();
        res.send(yearInfo);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car years data"})
    }
}

exports.getMakes = async(req, res) => {
    try {
        const { year } = req.params;
        const makeInfo = await carInfo.getMakes({ year });
        res.send(makeInfo);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car makes data"})
    }
}

exports.getModels = async(req, res) => {
    try {
        const { year, make } = req.params;
        const makeInfo = await carInfo.getModels({ year, make });
        res.send(makeInfo);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car models data"})
    }
}