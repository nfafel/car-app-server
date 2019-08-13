var jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.verifyJWT = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token);
        const phoneNumber = decoded.payload.phoneNumber;
        const user = await Users.findOne({phoneNumber: phoneNumber});
        const verified = jwt.verify(token, user.secret);
        req.payload = verified.payload;
        next()
    } catch(err) {
        console.log(err);
        res.status(401).send({message: "Invalid JWT"})
    }
}