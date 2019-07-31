const Repairs = require('../models/repairs');

exports.get = async(req, res) => {
    try {
        const result = await Repairs.find({});
        res.send({repairs: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting repairs data"})
    }
}

exports.getByCarId = async(req, res) => {
    try {
        const result = await Repairs.find({car_id: req.params.id});
        res.send({repairsForCar: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting repairs for car data"})
    }
}

exports.post = async(req, res) => {
    var newRepair;
    if (Object.values(req.query).length >= 1) {
        newRepair = new Repairs({
            car_id: req.query.car_id,
            description: req.query.description,
            date: req.query.date,
            cost: req.query.cost,
            progress: req.query.progress,
            technician: req.query.technician
        })
    } else {
        newRepair = new Repairs({
            car_id: req.body.car_id,
            description: req.body.description,
            date: req.body.date,
            cost: req.body.cost,
            progress: req.body.progress,
            technician: req.body.technician
        })
    }

    try {
        await newRepair.save();
        const result = await Repairs.find({});
        res.send({repairs: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error posting new repair data"})
    }
}

exports.put = async(req, res) => {
    var repairUpdates;
    if (Object.values(req.query).length >= 1) {
        repairUpdates = req.query;
    } else {
        repairUpdates = req.body;
    }

    try {
        await Repairs.findByIdAndUpdate(req.params.id, {'$set': repairUpdates}, { runValidators: true });
        const result = await Repairs.find({});
        res.send({repairs: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating repair data"})
    }
}

exports.delete = async(req, res) => {
    try {
        await Repairs.findByIdAndRemove(req.params.id);
        const result = await Repairs.find({});
        res.send({repairs: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating repair data"})
    }
}
