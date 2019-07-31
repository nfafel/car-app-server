const accountSid = 'ACe5c33365d919ba51826cbbebe1ae8801';
const authToken = '8f66906e91278f5779413afc931ce205';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.sendMessage = async(req, res) => {
    var text;
    if (Object.values(req.query).length >= 1) {
        text = req.query.text;
    } else {
        text = req.body.text;
    }

    try {
        const message = await client.messages.create({
            body: text,
            from: '+17176960866',
            to: `+${req.params.number}`
        });
        res.send(message.sid);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error sending sms"})
    }
}

exports.sendReponse = async(req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    // try {
    //     const message = await client.messages.create({
    //         body: text,
    //         from: '+17176960866',
    //         to: `+${req.params.number}`
    //     });
    //     res.send(message.sid);
    // } catch(err) {
    //     console.log(err);
    //     res.status(400).send({message: "Error sending sms"})
    // }
}