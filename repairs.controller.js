const Repairs = require('./repairs.model');

exports.repairs_get = (req, res, next) => {
    Repairs.find({}, (err, results) => {
        if(err){
            console.log(err);
        } else{
            res.send({repairs: results} );
        }
    });
}

exports.repairs_getById = (req, res, next) => {
    Repairs.findOne({carId: req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send({repairedCar: result} );
        }
    });
}

exports.repairs_post = (req, res, next) => {
    var newRepair;
    if (Object.values(req.query).length >= 1) {
        newRepair = new Repairs({
            carId: req.query.carId,
            description: req.query.description,
            estTime: req.query.estTime,
            cost: req.query.cost,
            progress: req.query.progress,
            technician: req.query.technician
        })
    } else {
        newRepair = new Repairs({
            carId: req.body.carId,
            description: req.body.description,
            estTime: req.body.estTime,
            cost: req.body.cost,
            progress: req.body.progress,
            technician: req.body.technician
        })
    }
    
    newRepair.save( (err, result) => {
        if(err) {
          console.log(err);
        }
        Repairs.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({repairs: results} );
            }
        });
    });
}

exports.repairs_put = (req, res, next) => {
    var repairUpdates;
    if (Object.values(req.query).length >= 1) {
        repairUpdates = req.query;
    } else {
        repairUpdates = req.body;
    }

    Repairs.findByIdAndUpdate(req.params.id, {'$set': repairUpdates}, (err, results) => {
        if(err) {
            throw err;
        }

        Repairs.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({repairs: results} );
            }
        });
    });
}

exports.repairs_delete = (req, res, next) => {
    
    Repairs.findByIdAndRemove(req.params.id, (err, results) => {
        if(err) {
            throw err;
        }

        Repairs.find({}, (err, results) => {
            if(err){
                console.log(err);
            } else{
                res.send({repairs: results} );
            }
        });
    });
}

