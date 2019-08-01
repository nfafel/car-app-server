const PhoneNumber = require('../models/sms');

const accountSid = 'ACe5c33365d919ba51826cbbebe1ae8801';
const authToken = '8f66906e91278f5779413afc931ce205';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.sendConfirmation = async(req, res) => {
    var confirmationNumber;
    if (Object.values(req.query).length >= 1) {
        confirmationNumber = req.query.confirmationNumber;
    } else {
        confirmationNumber = req.body.confirmationNumber;
    }

    try {
        const message = await client.messages.create({
            body: `Confirmation Number: ${confirmationNumber}`,
            from: '+17176960866',
            to: `+${req.params.number}`
        });
        res.send(message.sid);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error sending sms"})
    }
}

exports.subscribeNumber = async(req, res) => {
    var newPhoneNumber = new PhoneNumber({
        phoneNumber: req.params.number
    })
    await newPhoneNumber.save()
    const result = await PhoneNumber.find();
    res.send({numbers: result})
}

exports.sendResponse = async(req, res) => {
    try {
        const twiml = new MessagingResponse();

        console.log(req.body.Body)
        twiml.message(`${req.body.Body}`);
    
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } catch(err) {
        console.log(err)
    }
}