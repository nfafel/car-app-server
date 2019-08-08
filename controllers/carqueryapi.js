const fetch = require('node-fetch');

exports.getYears = async(req, res) => {
    try{
        var response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getYears', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        res.send(body);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car years data"})
    }
}

exports.getMakes = async(req, res) => {
    try {
        var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${req.params.year}`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        res.send(body);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car makes data"})
    }
}

exports.getModels = async(req, res) => {
    try {
        var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${req.params.make}&year=${req.params.year}`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        res.send(body);
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car models data"})
    }
}