const accountSid = 'ACe5c33365d919ba51826cbbebe1ae8801';
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.sendConfirmation = async(req, res) => {
    console.log(authToken)
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
        res.send(message.sid)
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error sending sms"})
    }
}

exports.sendResponse = async(req, res) => {
    try {
        const twiml = new MessagingResponse();
        if (req.body.Body === "NOMOREMESSAGES") {
            //await PhoneNumber.deleteMany({ phoneNumber : parseInt(req.body.From.slice(1)) });
            twiml.message("You are now unsubscribed from receiving text notifications.");
        } else {
            twiml.message("If you have questions or concerns, please contact (717)-555-5555");
        }
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Error responding to user SMS.'})
    }
}

exports.notifyCar = async(req, res) => {
    var text;
    if (req.body.crudType === "create") {
        text = `A new car was registered: ${req.body.car}`;
    } else if (req.body.crudType === "update") {
        text = `A car was updated. Car After Updates: ${req.body.car}`;
    } else {
        text = `A car was deleted: ${req.body.car}`;
    }

    try {
        const message = await client.messages.create({
            body: text,
            from: '+17176960866',
            to: `+${req.params.number}`
        });
        res.send(message.sid)
    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Error notifying user about car change.'})
    }
}

exports.notifyRepair = async(req, res) => {
    var text;
    if (req.body.crudType === "create") {
        text = `A new repair was added to the ${req.body.car} with the following description: ${req.body.description}.`;
    } else if (req.body.crudType === "update") {
        text = `A repair was updated for the ${req.body.car} with the following description: ${req.body.description}.`;
    } else {
        text = `A repair was deleted for the ${req.body.car} with the following description: ${req.body.description}.`;
    }

    try {
        const message = await client.messages.create({
            body: text,
            from: '+17176960866',
            to: `+${req.params.number}`
        });
        res.send(message.sid)
    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Error notifying user about car change.'})
    }
}