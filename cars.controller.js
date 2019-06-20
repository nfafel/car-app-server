const Cars = require('./cars.model');


exports.car_get = (req, res, next) => {
    myReactAppDb.collection('cars').find().toArray( (err, results) => {
        res.send({cars: results} );
    });
}

exports.car_post = (req, res, next) => {
    var newCar;
    if (Object.values(req.query).length >= 1) {
        newCar = req.query;
    } else {
        newCar = req.body;
    }
    
    myReactAppDb.collection('cars').insertOne(newCar, (err, result) => {
        if(err) {
          console.log(err);
        }
  
        myReactAppDb.collection('cars').find().toArray( (err, results) => {
            res.send({cars: results} );
        });
    });
}

exports.car_put = (req, res, next) => {
    var carUpdates;
    if (Object.values(req.query).length >= 1) {
        carUpdates = req.query;
    } else {
        carUpdates = req.body;
    }

    myReactAppDb.collection("cars").updateOne({_id: ObjectId(req.params.id)}, {'$set':{'make': carUpdates.make, 'model': carUpdates.model, 'year': carUpdates.year, 'rating': carUpdates.rating}}, (err, result) => {
        if(err) {
            throw err;
        }

        myReactAppDb.collection('cars').find().toArray( (err, results) => {
            res.send({cars: results} );
        });
    });
}

exports.car_delete = (req, res, next) => {
    
    myReactAppDb.collection('cars').deleteOne({_id : ObjectId(req.params.id)}, (err, result) => {
        if(err) {
          throw err;
        }

        myReactAppDb.collection('cars').find().toArray( (err, results) => {
            res.send({cars: results} );
        });
      });
}

