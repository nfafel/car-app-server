const Repairs = require('../models/repairs');

exports.get = async(req, res) => {
    try {
        const result = await Repairs.find({phoneNumber: req.payload.phoneNumber});
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
    try {
        var newRepair = new Repairs(req.body);
        await newRepair.save();
        res.send({repair: newRepair})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error posting new repair data"})
    }
}

exports.put = async(req, res) => {
    var repairUpdates = req.body;

    try {
        const result = await Repairs.findByIdAndUpdate(req.params.id, {'$set': repairUpdates}, { runValidators: true, new: true });
        res.send({repair: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating repair data"})
    }
}

exports.delete = async(req, res) => {
    try {
        await Repairs.findByIdAndRemove(req.params.id);
        res.send({repairId: req.params.id})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating repair data"})
    }
}
