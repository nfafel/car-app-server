const Cars = require('./cars.model');
const Repairs = require('./repairs.model')


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
    const response = await fetch('https://tranquil-caverns-41069.herokuapp.com/api/0.3/?cmd=getYears', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body) 
    }
    return body;
}

exports.cars_getMakes = (req, res, next) => {

}

exports.cars_getModels = (req, res, next) => {

}
