const Cars = require('../models/cars');
const Repairs = require('../models/repairs');
const fetch = require('node-fetch');

exports.get = async(req, res) => {
    try {
        const result = await Cars.find({});
        res.send({cars: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting cars data"})
    }
}

exports.getById = async(req, res) => {
    try {
        const result = await Cars.findById(req.params.id);
        res.send({car: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting car data by ID"})
    }
}

exports.post = async(req, res) => {
    var newCar;
    if (Object.values(req.query).length >= 1) {
        newCar = new Cars({
            make: req.query.make,
            model: req.query.model,
            year: req.query.year,
            rating: req.query.rating
        })
    } else {
        newCar = new Cars({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            rating: req.body.rating
        })
    }

    try {
        await newCar.save();
        const result = await Cars.find({});
        res.send({cars: result})
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
        await Cars.findByIdAndUpdate(req.params.id, {'$set': carUpdates}, { runValidators: true });
        const result = await Cars.find({});
        res.send({cars: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating car data"})
    }
}

exports.delete = async(req, res, next) => {
    try {
        await Repairs.deleteMany( {car_id: req.params.id} );
        await Cars.findByIdAndRemove(req.params.id);
        const results = await Cars.find();
        res.send( {cars: results} );
    } catch(err) {
        throw err;
    }
}

exports.getYears = async(req, res, next) => {
    var response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getYears', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}

exports.getMakes = async(req, res, next) => {
    var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${req.params.year}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}

exports.getModels = async(req, res, next) => {
    var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${req.params.make}&year=${req.params.year}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}