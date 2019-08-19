const jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.contextFunc = async( req ) => {
    if (req.headers.authorization !== null) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.decode(token);
            const phoneNumber = decoded.payload.phoneNumber;
            const user = await Users.findOne({phoneNumber: phoneNumber});
            const verified = jwt.verify(token, user.secret);
            var context = verified.payload;
            context.authenticationVerified = true;
            return context;
        } catch(err) {
            console.log(err);
            return {authenticationVerified: false}
        }
    } 
    return {authenticationVerified: false}
}
