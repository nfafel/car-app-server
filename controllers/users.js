const jwt = require('jsonwebtoken');
const randomWords = require('random-words');

const Users = require('../models/users');
const Cars = require('../models/cars');
const Repairs = require('../models/repairs');

exports.loginUser = async(req, res) => {
    const enteredPassword = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    try {
        const user = await Users.findOne({phoneNumber: phoneNumber});
        if (user === null) {
            res.send({message: "The username you entered is not registered."})
        } else if (user.password !== enteredPassword) {
            res.send({message: "Incorrect password"})
        } else {
            const payload = {
                phoneNumber: user.phoneNumber,
                subscribed: user.subscribed
            }
            var token = jwt.sign({
                payload: payload
            }, user.secret, { expiresIn: 10 });
            res.send({token: token})
        }

    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error Logging in User"})
    }
}

exports.checkAvailability = async(req, res) => {
    try {
        const user = await Users.findOne({phoneNumber: req.params.phoneNumber});
        if (user === null) {
            res.send({available: true})
        } else {
            res.send({available: false})
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error getting users"})
    }
}

exports.changeSubscription = async(req, res) => {
    var updatedSubscription = req.body.subscribed;

    try {
        const updatedUser = await Users.findOneAndUpdate({phoneNumber: req.body.phoneNnumber}, {subscribed: updatedSubscription}, { new: true });
        res.send({user: updatedUser})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Error updating subscription data"})
    }
}

exports.post = async(req, res) => {
    try {
        var newUser = new Users({
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            subscribed: req.body.subscribed,
            secret: randomWords()
        });
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