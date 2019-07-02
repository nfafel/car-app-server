const Cars = require('./cars.model');
const Repairs = require('./repairs.model');
const fetch = require('node-fetch');


exports.cars_get = (req, res, next) => {
    Cars.find({}, (err, results) => {
        if(err){
            console.log(err);
        } else{
            res.send({cars: results} );
        }
    });
}

exports.cars_getById = (req, res, next) => {
    Cars.findById(req.params.id, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send({car: result} );
        }
    });
}

exports.cars_post = (req, res, next) => {
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
    
    newCar.save( (err, result) => {
        if(err) {
          console.log(err);
        }
        Cars.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({cars: results} );
            }
        });
    });
}

exports.cars_put = (req, res, next) => {
    var carUpdates;
    if (Object.values(req.query).length >= 1) {
        carUpdates = req.query;
    } else {
        carUpdates = req.body;
    }

    Cars.findByIdAndUpdate(req.params.id, {'$set': carUpdates}, (err, results) => {
        if(err) {
            throw err;
        }

        Cars.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({cars: results} );
            }
        });
    });
}

exports.cars_delete = (req, res, next) => {
    
    Cars.findByIdAndRemove(req.params.id, (err, results) => {
        if(err) {
            throw err;
        }

        Cars.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({cars: results} );
            }
        });
    });
}

exports.cars_deleteRepairs = (req, res, next) => {
    
    Repairs.deleteMany( {'car._id' : req.params.id}, (err, results) => {
        if (err) {
            throw err;
        }

        Cars.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({cars: results} );
            }
        });
    });
}

exports.cars_getYears = async(req, res, next) => {
    var response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getYears', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}

exports.cars_getMakes = async(req, res, next) => {
    var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${req.params.year}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}

exports.cars_getModels = async(req, res, next) => {
    var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${req.params.make}&year=${req.params.year}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    var body = await response.json();
    res.send(body);
}
