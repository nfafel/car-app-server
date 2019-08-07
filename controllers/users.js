const Users = require('../models/users');
const Cars = require('../models/cars');
const Repairs = require('../models/repairs');

exports.get = async(req, res) => {
    try {
        const result = await Users.find();
        res.send({users: result})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting users"})
    }
}

exports.getUser = async(req, res) => {
    try {
        const user = await Users.findOne({phoneNumber: req.params.number});
        res.send({user: user})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting users"})
    }
}

exports.post = async(req, res) => {
    var newUser;
    if (Object.values(req.query).length >= 1) {
        newUser = new Users({
            phoneNumber: req.query.phoneNumber,
            password: req.query.password
        });
    } else {
        newUser = new Users({
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        });
    }

    try {
        await newUser.save();
        res.send({newUser: newUser});
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting users"});
    }
}

exports.delete = async(req, res) => {
    try {
        await Users.deleteMany({phoneNumber: req.params.number})
        await Cars.deleteMany({user: req.params.number})
        await Repairs.deleteMany({user: req.params.number})
        res.send({userRemoved: req.params.number})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting users"})
    }
}